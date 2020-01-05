import React from "react"
import PropTypes from "prop-types"

const isExternal = href => /^(https?:\/\/|tel:|mailto:)/.test(href)

export default function Link({
  href,
  children = href,
  style,
  target,
  rel = "",
  external = isExternal(href),
  ...props
}) {
  // Enforce save browsing
  // https://mathiasbynens.github.io/rel-noopener/
  if ("_blank" === target) {
    rel = (rel || "noopener noreferrer")
    if (rel.indexOf("noopener") === -1) {
      rel = rel + " noopener"
    }
  }

  if (external) {
    if (!rel || rel.indexOf("external") === -1) {
      rel = rel + " external"
    }
  }
  return <a href={href} style={style} target={target} rel={rel.trim()} {...props}>{children}</a>
}
Link.propTypes = {
  href: PropTypes.string.isRequired,
  target: PropTypes.oneOf(["_self", "_blank", "_parent", "_top"]),
  rel: PropTypes.string,
  external: PropTypes.bool,
  children: PropTypes.node,
  style: PropTypes.object,
  /** CSS class names to style the component. */
  className: PropTypes.string,
}
