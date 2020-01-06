import React from "react"
import PropTypes from "prop-types"

import Distance from "../Distance/DistanceLabel"

export default function TrackPointListItem({
  title,
  coord,
  className,
  distance,
  onRemoveClick,
  onDragOver,
  onDragStart,
  onDragEnd,
}) {
  const styles = {
    firstLine: {
      display: "flex",
      justifyContent: "space-between",
    },
  }
  return (
    <li
      className={className}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}>
      <div>
        <div style={styles.firstLine}>
          { title || `${coord[0].toFixed(4)}\n${coord[1].toFixed(4)}` }
          <a
            className="remove"
            href="#"
            onClick={onRemoveClick}
            title="Remove"/>
        </div>
        { !!distance && <Distance distance={distance}/> }
      </div>
    </li>
  )
}
TrackPointListItem.propTypes = {
  coord: PropTypes.array,
  className: PropTypes.string,
  distance: PropTypes.number,
  title: PropTypes.string,
  onRemoveClick: PropTypes.func,
  onDragStart: PropTypes.func,
  onDragOver: PropTypes.func,
  onDragEnd: PropTypes.func,
}
