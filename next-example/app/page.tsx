"use client"

import ReactGodot from "react-godot"

const examplePck = "/flappy/flappy.pck"
const exampleEngine = "/flappy/flappy.js"

export default function Home() {
  return <ReactGodot pck={examplePck} script={exampleEngine} />
}
