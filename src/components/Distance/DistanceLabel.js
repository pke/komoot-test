import PropTypes from "prop-types"
import React from "react"

import formatDistance from "./formatDistance"

export default function DistanceLabel({ distance, style }) {
  if (!distance) {
    return <span style={style}/>
  }
  {/*i18n*/}
  return (
    <span
      style={style}
      className="distance"
    >
      {"ca. " + formatDistance(distance)}
    </span>
  )
}
DistanceLabel.propTypes = {
  /** Distance in km */
  distance: PropTypes.number.isRequired,
  style: PropTypes.object,
}
