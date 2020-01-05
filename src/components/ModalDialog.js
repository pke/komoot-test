import React from "react"
import PropTypes from "prop-types"
import { createPortal } from "react-dom"

import useKeyDown from "../hooks/useKeyDown"

export default function ModalDialog({ hide, children, title }) {
  useKeyDown(27, hide)
  const onCloseClick = () => hide()
  return createPortal(
    <React.Fragment>
      <div className="modal-overlay" aria-modal aria-hidden tabIndex={-1} role="dialog">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="modal-close" data-dismiss="modal" aria-label="Close" title="Close" onClick={onCloseClick}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          { title && <h3>{title}</h3> }
          { children }
        </div>
      </div>
    </React.Fragment>,
    document.body
  )
}
ModalDialog.propTypes = {
  hide: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
}
