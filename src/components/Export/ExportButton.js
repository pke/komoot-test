import React from "react"
import PropTypes from "prop-types"

import exportGPX from "./exportGPX"

const saveFile = (fileName, mimeType, data) => {
  const link = document.createElement("a")
  document.body.append(link)
  link.style.display = "none"
  const blob = new Blob([data], { type: mimeType })
  const url = window.URL.createObjectURL(blob)
  link.href = url
  if (fileName) {
    link.download = fileName
  }
  link.click()
  window.URL.revokeObjectURL(url)
  window.setTimeout(() => document.body.removeChild(link), 10)
}

export default function ExportButton({ coords = {}, children, creator, fileName}) {
  const onClick = () => {
    saveFile(fileName, "text/xml", exportGPX({ coords, creator }))
  }
  return <button disabled={!coords.length} onClick={onClick}>{children}</button>
}
ExportButton.propTypes = {
  coords: PropTypes.arrayOf(PropTypes.array).isRequired,
  children: PropTypes.node,
  creator: PropTypes.string.isRequired,
  fileName: PropTypes.string,
}
ExportButton.defaultProps = {
  coords: {},
}
