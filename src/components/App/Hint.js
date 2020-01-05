import React from "react"
import PropTypes from "prop-types"

export default function Hint({ children, ...props }) {
  return <p className="hint" {...props}>{children}</p>
}
Hint.propTypes = {
  children: PropTypes.node,
}
