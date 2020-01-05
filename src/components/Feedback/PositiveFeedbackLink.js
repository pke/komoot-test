import React from "react"
import PropTypes from "prop-types"

import FeedbackEmailLink from "./internal/FeedbackEmailLink"

export default function PositiveFeedbackLink({email}) {
  return <FeedbackEmailLink
    mood="ok"
    email={email}
    className="feedback positive"
    title="We like it!"
  />
}
PositiveFeedbackLink.propTypes = {
  email: PropTypes.string.isRequired,
}

