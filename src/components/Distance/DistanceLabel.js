import PropTypes from "prop-types"
import React from "react"

const formatDistance = require("./formatDistance")

export default function DistanceLabel({ distance, ...props }) {
  return (
    <span className="distance" {...props}>
      { formatDistance(distance) }
    </span>
  )
}
DistanceLabel.propTypes = {
  /** Distance in km */
  distance: PropTypes.number.isRequired,
}
