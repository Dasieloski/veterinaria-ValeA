import { useEffect } from 'react'

export function useInactiveTabTitle(inactiveTitle: string) {
  useEffect(() => {
    const originalTitle = document.title
    let timeoutId: NodeJS.Timeout

    const handleVisibilityChange = () => {
      if (document.hidden) {
        timeoutId = setTimeout(() => {
          document.title = inactiveTitle
        }, 5000) // Change title after 5 seconds of inactivity
      } else {
        clearTimeout(timeoutId)
        document.title = originalTitle
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      clearTimeout(timeoutId)
      document.title = originalTitle
    }
  }, [inactiveTitle])
}

