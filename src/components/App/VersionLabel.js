import React from "react"
import PropTypes from "prop-types"

const isDirty = version => /\+$/.test(version)

const title = (version, branch) => (
  [
    branch,
    isDirty(version) && "Dirty branch",
  ].filter(Boolean).join(" | ")
)

export default function VersionLabel({ version, branch, ...props }) {
  return <div title={title(version, branch)} {...props}>version: {version}</div>
}
VersionLabel.propTypes = {
  version: PropTypes.string.isRequired,
  branch: PropTypes.string,
}
