import { DiscordContextProvider, useDiscordContext } from "./DiscordProvider"

export default function DiscordClient({ children }) {
  return (
    <DiscordContextProvider>
      {children}
      <DiscordInfoPanel />
    </DiscordContextProvider>
  )
}

const DiscordInfoPanel = () => {
  const discordCtx = useDiscordContext()
  return (
    <>
      <aside className="absolute top-2 right-2">
        <section className="flex items-center gap-2">
          <img src={discordCtx.avatarURL} className="rounded-full w-8 h-8" />
          {discordCtx.displayName}
        </section>
      </aside>
      {/* <pre>{JSON.stringify(discordCtx, null, 2)}</pre> */}
    </>
  )
}
