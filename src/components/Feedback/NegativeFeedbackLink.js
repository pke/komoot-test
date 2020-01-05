import React from "react"
import PropTypes from "prop-types"

import FeedbackEmailLink from "./internal/FeedbackEmailLink"

export default function NegativeFeedbackLink({email}) {
  return <FeedbackEmailLink
    mood="meh"
    email={email}
    className="feedback negative"
    title="It's meh!"
  />
}
NegativeFeedbackLink.propTypes = {
  email: PropTypes.string.isRequired,
}

