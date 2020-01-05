import React from "react"
import PropTypes from "prop-types"

import ModalDialog from "../ModalDialog"

export default function ResetTrackDialog({ done }) {
  const reset = () => done(true)

  return (
    <ModalDialog hide={done} className="reset-track-dialog" title="Reset Track">
      <p>All track points will be deleted.</p>
      <p>No worries though, this can be <b>undone</b>.</p>
      <div className="modal-buttons">
        <button onClick={reset}>Reset Track</button>
      </div>
    </ModalDialog>
  )
}
ResetTrackDialog.propTypes = {
  done: PropTypes.func.isRequired,
}
