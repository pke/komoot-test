import PropTypes from "prop-types"
import React from "react"

import emailUri from "./emailUri"
import Link from "../../Link"

/**
 * Renders a link with the protocol `mailto`
 *
 * If you omit the children then the `address` prop will be rendered as link
 * content.
 *
 */
export default function EmailLink({ address, children = address, subject, body, ...props }) {
  return (
    <Link href={emailUri({ address, subject, body })} {...props}>
      {children}
    </Link>
  )
}
EmailLink.propTypes = {
  /** A valid email address. Its not validated. */
  address: PropTypes.string.isRequired,
  /** The subject to use for the email. */
  subject: PropTypes.string.isRequired,
  /** The text-only body for the email. */
  body: PropTypes.string,
  className: PropTypes.string,
  /** The content of the link. */
  children: PropTypes.node,
}
