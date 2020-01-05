import { useEffect } from "react"

/**
 * Hook to capture key down events.
 *
 * @example
 * // Calls the `hide` function when the ESC key is pressed down
 * useKeyDown(27, hide)
 *
 * @param {number} keyCode to capture
 * @param {Function} onKey function to call when the key is pressed down
 */
export default function useKeyDown(keyCode, onKey) {
  const onKeyDown = event => {
    if (keyCode === event.keyCode) {
      onKey()
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown)
    return () => {
      window.removeEventListener("keydown", onKeyDown)
    }
  }, []) // TODO: Check if we need to capture maybe the `onKey` callback here?
}
