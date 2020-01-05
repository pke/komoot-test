import React from "react"
import PropTypes from "prop-types"

import EmailLink from "../../EmailLink"

const FEEDBACK = {
  ok: {
    subject: "We like it!",
    body: `
Hello Phil,

we like what you have created.

Here are a few suggestions:

*
*
*
*

We also have some questions:

1.
2.
3.

Regards,
`},
  meh: {
    subject: "There are some issues with it",
    body: `
Hello Phil,

thank you for your efforts. Its interesting but unfortunately not what we were
looking for.

However here are a few suggestions to improve your solution:

*
*
*
*

Keep learning! Keep improving! There is always a second chance.

Regards,
`,
  },
}

export default function FeedbackEmailLink({ mood, email, ...props }) {
  return <EmailLink
    address={email}
    subject={FEEDBACK[mood].subject}
    body={FEEDBACK[mood].body}
    {...props}>
    { "ok" === mood ? "😍" : "😢 " }
  </EmailLink>
}
FeedbackEmailLink.propTypes = {
  mood: PropTypes.oneOf(["ok", "meh"]).isRequired,
  email: PropTypes.string.isRequired,
}

