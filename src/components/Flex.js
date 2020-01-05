import React from "react"
import PropTypes from "prop-types"

export default function Flex({ children, className, component = <div/>, ...props }) {
  const style = {
    display: "flex",
    ...props,
  }
  const newProps = {
    style,
    className,
  }
  return React.createElement(component, newProps, children)
}
Flex.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
}
