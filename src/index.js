import React from "react"
import { render } from "react-dom"

import App from "./components/App/App"
import { author } from "../package.json"

const COORDS = [
  [52.4794347588594,13.022747039794924,0,""],
  [52.47859891489594,13.030726790784229,0,""],
  [52.48685711037973,13.031845275922654,0,""],
  [52.49427670407443,13.046434905670615,0,""],
  [52.50681901952752,13.031396952864338,0,""],
]

const root = document.getElementById("app")
render(
  <App
    feedbackEmail={author.email}
    git={{
      version: root.dataset.version,
      branch: root.dataset.branch,
    }}
    coords={COORDS}
  />,
  root
)
