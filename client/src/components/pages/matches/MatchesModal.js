import React, { useState, useEffect, useRef } from 'react'

function Example () {
  const [count, setCount] = useState(0)

  useInterval(() => {
    // Your custom logic here
    if (count === randomEvent()) {
      console.log('random event at:', count)
    }
    if (count === randomEvent()) {
      console.log('random event at:', count)
    }
    setCount(count + 1)

    if (count === 2) {
      clearInterval()
    }
  }, 1000)

  return <h1>{count}</h1>
}

function useInterval (callback, delay) {
  const savedCallback = useRef()

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    const tick = () => {
      savedCallback.current()
    }

    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

function randomEvent () {
  return Math.floor((Math.random() * 50) + 1)
}

export default Example
