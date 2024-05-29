import axios from "axios"
import * as React from "react"
import { RPCCloseCodes } from "@discord/embedded-app-sdk"

import { discordSdk } from "./initDiscordSDK"
import { getUserAvatarUrl } from "./utils/getUserAvatarUrl"
import { getUserDisplayName } from "./utils/getUserDisplayName"

const DiscordContext = React.createContext<any>({
  displayName: "",
  avatarURL: "",
  user: {
    id: "",
    username: "",
    discriminator: "",
    avatar: null,
    public_flags: 0,
  },
  access_token: "",
  scopes: [],
  expires: "",
  application: {
    rpc_origins: undefined,
    id: "",
    name: "",
    icon: null,
    description: "",
  },
  guildMember: null,
  client: undefined,
  room: undefined,
})

export function DiscordContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const discordContext = useDiscordContextSetup()

  if (discordContext == null) {
    return <main>Loading...</main>
  }

  return (
    <DiscordContext.Provider value={discordContext}>
      {children}
    </DiscordContext.Provider>
  )
}

export function useDiscordContext() {
  return React.useContext(DiscordContext)
}

function useDiscordContextSetup() {
  const [auth, setAuth] = React.useState<any | null>(null)
  const settingUp = React.useRef(false)

  React.useEffect(() => {
    window.addEventListener("beforeunload", () =>
      discordSdk.close(
        RPCCloseCodes.CLOSE_ABNORMAL,
        "[DEV] A hard reload was detected, activity closed to prevent issues."
      )
    )

    const setUpDiscordSdk = async () => {
      await discordSdk.ready()

      const { code } = await discordSdk.commands.authorize({
        client_id: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID as string,
        response_type: "code",
        state: "",
        prompt: "none",
        // More info on scopes here: https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes
        scope: ["identify", "guilds", "guilds.members.read", "rpc.voice.read"],
      })

      const response = await axios.post("/api/discord/token", {
        code,
      })
      const { access_token } = response.data

      const newAuth = await discordSdk.commands.authenticate({
        access_token,
      })

      // Get guild specific nickname and avatar, and fallback to user name and avatar
      const guildMember = await axios
        .get(
          `https://discord.com/api/users/@me/guilds/${discordSdk.guildId}/member`,
          {
            headers: { Authorization: `Bearer ${access_token}` },
          }
        )
        .then((j) => j.data)
        .catch(() => {
          return null
        })

      let channelName = "Channel"

      if (discordSdk.channelId != null && discordSdk.guildId != null) {
        const channel = await discordSdk.commands.getChannel({
          channel_id: discordSdk.channelId,
        })
        if (channel.name != null) {
          channelName = channel.name
        }
      }

      const avatarURL = getUserAvatarUrl({
        guildMember,
        user: newAuth.user,
      })

      const displayName = getUserDisplayName({
        guildMember,
        user: newAuth.user,
      })

      setAuth({
        ...newAuth,
        guildMember,
        room: channelName,
        avatarURL,
        displayName,
      })
    }

    if (!settingUp.current) {
      settingUp.current = true
      setUpDiscordSdk()
    }
  }, [])

  return auth
}
