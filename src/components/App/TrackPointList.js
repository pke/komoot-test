import React, { useRef } from "react"
import PropTypes from "prop-types"

import TrackPointListItem from "./TrackPointListItem"

import getDistance from "../Distance/getDistance"

// i18n
const defaultTitle = (index, lastIndex) => (
  0 === index
    ? "Start"
    : index === lastIndex
      ? "Finish"
      : `Waypoint ${index}`
)

const key = coord => coord.toString()

export default function TrackPointList({
  items,
  totalDistance,
  children,
  className = "list",
  onRemove,
  onMove,
}) {
  const lastItemIndex = items.length - 1
  const draggedIndexRef = useRef()
  const draggedOverIndexRef = useRef()

  const render = (item, index) => {
    let distance
    if (lastItemIndex - index >= 1) {
      const next = items[index + 1]
      distance = getDistance(item[0], item[1], next[0], next[1])
    } else if (index > 0 && index === lastItemIndex) {
      distance = totalDistance
    }
    const onRemoveClick = () => onRemove(index)
    const onDragOver = () => {
      draggedOverIndexRef.current = index
    }
    const onDragStart = event => {
      draggedIndexRef.current = index
      event.dataTransfer.effectAllowed = "move"
      event.dataTransfer.setData("text/html", event.target)
      event.dataTransfer.setDragImage(event.target, 20, 20)
    }
    const onDragEnd = () => {
      if (draggedIndexRef.current === draggedOverIndexRef.current) {
        return
      }
      onMove(draggedIndexRef.current, draggedOverIndexRef.current)
    }

    const title = item[3] || defaultTitle(index, lastItemIndex)

    return <TrackPointListItem
      key={key(item)}
      title={title}
      coord={item}
      distance={distance}
      onRemoveClick={onRemoveClick}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
    />
  }
  const renderedItems = items.map(render)
  return renderedItems.length ? <ol className={className}>
    { renderedItems }
  </ol> : <div className={className}>{children}</div>
}
TrackPointList.propTypes = {
  items: PropTypes.array,
  totalDistance: PropTypes.number,
  children: PropTypes.node,
  className: PropTypes.string,
  onRemove: PropTypes.func,
  onMove: PropTypes.func,
}
