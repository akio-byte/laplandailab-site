import React from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToHash: React.FC = () => {
  const location = useLocation()

  React.useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '')

      const scrollToElement = () => {
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
          return true
        }
        return false
      }

      if (!scrollToElement()) {
        const timeout = window.setTimeout(() => {
          scrollToElement()
        }, 120)

        return () => window.clearTimeout(timeout)
      }

      return
    }

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname, location.hash])

  return null
}

export default ScrollToHash
