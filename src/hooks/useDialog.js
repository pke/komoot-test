import assert from "assert"
import { useState } from "react"

/**
 * Hook for dialog management.
 *
 * The idea is that you hand in `onClose` to your dialogs and with whatever its
 * called from within the dialog, the initially handed in `done` function is
 * called.
 *
 * @param {Function} done called with the argument `onClose` was called with
 * @param {*} state of the dialog. This could be field values for form
 * inputs.
 *
 * @returns {Array} [ visible, toggle, onClose, state ]
 */
export default function useModal (done, state) {
  done && assert(typeof done === "function", "`done` argument must be a function")

  const [current, setState] = useState({ visible: false, state })

  const onClose = (result) => {
    // In case the `done` function throws, we better toggle the dialog here
    toggle(result)
    // TODO: Add error handling here and display errors thrown by `done` in the
    // dialog via a new exposed "errors" return member
    result && done(result)
  }

  const toggle = (newState) => setState({ visible: !current.visible, state: newState })

  return [
    current.visible, toggle, onClose, current.state,
  ]
}
