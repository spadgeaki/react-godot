import { DiscordSDK } from "@discord/embedded-app-sdk"

let discordSdk = new DiscordSDK(
  process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID as string
)

export { discordSdk }
