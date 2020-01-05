import React from "react"
import PropTypes from "prop-types"

import ModalDialog from "../ModalDialog"

export default function PrivacyPolicyDialog({ done }) {
  const clean = () => done(true)
  const cancel = () => done()

  return (
    <ModalDialog hide={done} className="privacy-policy-dialog" title="Privacy Policy">
      <p>This app saves tracks to local storage.</p>
      <div className="modal-buttons">
        <button onClick={clean}>Clean Now</button>
        <button onClick={cancel}>That&apos;s OK!</button>
      </div>
    </ModalDialog>
  )
}
PrivacyPolicyDialog.propTypes = {
  done: PropTypes.func.isRequired,
}
