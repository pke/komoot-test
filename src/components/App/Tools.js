import React from "react"
import PropTypes from "prop-types"

const Tools = ({ children }) => (
  <section id="tools">
    { children }
  </section>
)
Tools.propTypes = {
  children: PropTypes.node,
}

export default Tools
