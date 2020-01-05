import { useReducer, useCallback } from "react"

const reducer = (state, action) => {
  const { past, present } = state
  //console.log("useUndo", action.type, action.payload)

  switch (action.type) {
  case "undo": {
    const previous = past[past.length - 1]
    const newPast = past.slice(0, past.length - 1)

    return {
      past: newPast,
      present: previous,
    }
  }
  case "set": {
    const { payload } = action

    if (payload === present) {
      //console.log("useUndo", "same")
      return state
    }

    return {
      past: [...past, present],
      present: payload,
    }
  }
  }
}

/**
 * Hook for simple undo functionality.
 *
 * @param {*} initialState of the undo stack
 *
 * @returns {Array} [ current, { undo, canUndo, set }]
 */
const useUndo = initialState => {
  const [current, dispatch] = useReducer(reducer, {
    past: [],
    present: initialState,
  })

  /**
   * @returns whether undo can be performed or not
   */
  const canUndo = current.past.length > 0

  const undo = useCallback(() => {
    canUndo && dispatch({ type: "undo" })
  },
  [canUndo, dispatch])

  const set = useCallback((state) => {
    dispatch({ type: "set", payload: state })
  },
  [dispatch])

  return [current.present, { set, undo, canUndo }]
}

export default useUndo
