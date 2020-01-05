import React from "react"
import PropTypes from "prop-types"

import useDialog from "../../hooks/useDialog"
import ResetTrackDialog from "./ResetTrackDialog"

export default function ResetTrackButton({ reset, ...props}) {
  const [ visible, toggle, done ] = useDialog(reset)
  return (
    <>
      <button onClick={toggle} {...props}>Reset Track</button>
      { visible && <ResetTrackDialog done={done}/> }
    </>
  )
}
ResetTrackButton.propTypes = {
  reset: PropTypes.func.isRequired,
}
