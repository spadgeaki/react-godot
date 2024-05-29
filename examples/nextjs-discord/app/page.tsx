"use client"

import ReactGodot from "react-godot"
import dynamic from "next/dynamic"

const DiscordClient = dynamic(() => import("./discord/DiscordClient"), {
  ssr: false,
})

const examplePck = "/flappy/flappy.pck"
const exampleEngine = "/flappy/flappy.js"

export default function Home() {
  return (
    <DiscordClient>
      <ReactGodot pck={examplePck} script={exampleEngine} />
    </DiscordClient>
  )
}
