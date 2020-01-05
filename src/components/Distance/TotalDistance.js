import React from "react"
import PropTypes from "prop-types"

import getDistance from "./getDistance"
import DistanceLabel from "./DistanceLabel"

export default function TotalDistance({ coords = [] }) {
  const totalDistance = coords.reduce((total, coord, index, all) => {
    if (index > 0) {
      const prev = all[index - 1]
      total += getDistance(coord[0], coord[1], prev[0], prev[1])
    }
    return total
  }, 0)
  return <span>Total: <DistanceLabel distance={totalDistance}/></span>
}
TotalDistance.propTypes = {
  coords: PropTypes.array,
}
