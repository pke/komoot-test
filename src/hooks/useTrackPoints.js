import { useReducer } from "react"

const reducer = (state, action) => {
  //console.log("useTrackPoints ", action.type, action.payload)
  switch (action.type) {
  case "add": return [...state, action.payload]
  case "remove": return state.filter((_, index) => index !== action.payload)
  case "update": {
    const { index:updateIndex, ...props } = action.payload
    return state.map((item, index) => {
      if (index === updateIndex) {
        return [props.lat || item[0],
          props.lng || item[1],
          props.alt || item[2],
          props.title || item[3],
        ]
      }
      return item
    })
  }
  case "move": {
    const { from, to } = action.payload
    // filter out moved item
    const items = state.filter((_, index) => index !== from)
    items.splice(to, 0, state[from])
    return items
  }
  case "set": return action.payload
  }
}

/**
 * Hook to manage list of track points.
 *
 * Each point is an array of up to 4 items:
 * 0 - lat
 * 1 - lng
 * 2 - elevation
 * 3 - title
 *
 * FIXME: Refactor to use GEOJson features all around.
 *
 * @param {Array} initialPoints points to start with
 *
 * @returns {Array} [ trackPoints, { functions to manipulate the list }]
 */
const useTrackPoints = (initialPoints) => {
  const [ current, dispatch ] = useReducer(reducer, initialPoints)

  const add = (coord, title) => {
    dispatch({ type: "add", payload: [...coord, 0, title ] })
  }

  const update = (index, props) => dispatch( { type: "update", payload: {
    index, ...props,
  }})

  const remove = index => dispatch({ type: "remove", payload: index })
  const move = (from, to) => dispatch({ type: "move", payload: { from, to } })

  const set = (items) => dispatch({ type: "set", payload: items })
  const clear = set.bind(this, [])

  return [
    current,
    {
      set,
      add,
      remove,
      update,
      move,
      clear,
    },
  ]
}
export default useTrackPoints
