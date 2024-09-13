import { useDebugValue, useEffect, useState } from 'react'

export const useMediaQuery = (queryValue: string, initialValue = false) => {
  const [match, setMatch] = useState(initialValue)

  useDebugValue(`Query: ${queryValue}`, (name) => `${name} modificado`)

  useEffect(() => {
    let isMounted = true
    const matchMedia = window.matchMedia(queryValue)

    const handleChange = () => {
      if (!isMounted) return
      setMatch(Boolean(matchMedia.matches))
    }

    matchMedia.addEventListener('change', handleChange)
    setMatch(!!matchMedia.matches)

    return () => {
      isMounted = false
      matchMedia.removeEventListener('change', handleChange)
    }
  }, [queryValue])

  return match
}
