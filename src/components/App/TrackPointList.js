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
      : undefined
)

const key = coord => coord.toString()

export default function TrackPointList({ items, children, className = "list", onRemove, onMove }) {
  const lastItemIndex = items.length - 1
  const draggedIndexRef = useRef()
  const draggedOverIndexRef = useRef()

  const render = (item, index) => {
    let distance
    if (index < lastItemIndex) {
      const prev = items[index + 1]
      distance = getDistance(item[0], item[1], prev[0], prev[1])
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
  const style = {
    paddingLeft: "1rem",
    overflowY: "auto",
    flex: 1,
  }
  return renderedItems.length ? <ol className={className} style={style}>
    { renderedItems }
  </ol> : <div className={className}>{children}</div>
}
TrackPointList.propTypes = {
  items: PropTypes.array,
  children: PropTypes.node,
  className: PropTypes.string,
  onRemove: PropTypes.func,
  onMove: PropTypes.func,
}
