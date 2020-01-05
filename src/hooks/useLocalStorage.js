import { useState } from "react"

/**
 * A hook that provides access to window.localStorage for a specific key.
 *
 * @param {string} key to save the values to
 * @param {*} initialValue to use when no value was stored or `clear` is called
 * @param {Function} onError function that takes an error as only argument
 *
 * @returns {Array} [value, setValue, clearValue]
 */
const useLocalStorage = (key, initialValue, onError = console.error.bind(this)) => {
  const [storageValue, setStorageValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(key)
      return value ? JSON.parse(value) : initialValue
    } catch (error) {
      onError(error)
      return initialValue
    }
  })

  /**
   * @function set
   * Sets the value of the key in the local storage.
   *
   * In case of an error the `onError` callback is called with the error as its
   * only argument.
   * @param {*} value any value to save to the local storage
   */
  const set = value => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
      setStorageValue(value)
    } catch (error) {
      onError(error)
    }
  }

  /**
   * Clears the local storage key
   */
  const clear = () => {
    try {
      window.localStorage.removeItem(key)
      setStorageValue(undefined)
    } catch (error) {
      onError(error)
    }
  }

  return [storageValue, set, clear]
}

export default useLocalStorage
