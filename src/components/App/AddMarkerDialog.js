import React from "react"
import PropTypes from "prop-types"

import ModalDialog from "../ModalDialog"

const AddMarkerDialog = ({ done, ...props }) => {
  const onSubmit = event => {
    event.preventDefault()
    const { lat, lng, title } = event.target.elements
    done({
      lat: lat.valueAsNumber,
      lng: lng.valueAsNumber,
      title: title.value,
    })
  }
  const { lat, lng, title } = props
  return (
    <ModalDialog hide={done} className="add-marker-dialog">
      <form onSubmit={onSubmit}>
        <label htmlFor="lat">Latitude:</label>
        <input name="lat" type="number" required defaultValue={lat}/>
        <label htmlFor="lng">Longitude:</label>
        <input name="lng" type="number" required defaultValue={lng}/>
        <label htmlFor="title">Title <small>(optional)</small></label>
        <input name="title" type="text" autoFocus defaultValue={title}/>
        <div className="modal-buttons">
          <input type="submit" value="Add"/>
        </div>
      </form>
    </ModalDialog>
  )
}
AddMarkerDialog.propTypes = {
  done: PropTypes.func.isRequired,
  lat: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  lng: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.string,
}

export default AddMarkerDialog
