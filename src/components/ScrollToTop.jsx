import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * ScrollToTop — Lenis-aware
 *
 * Lenis overrides the native scroll container, so window.scrollTo(0,0) is
 * ignored. We must call lenis.scrollTo(0) directly.
 * Lenis stores itself on window.__lenis (we set that in App.jsx).
 */
const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    // Try Lenis first (smooth-scroll library used in this app)
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true, force: true })
      return
    }

    // Fallback for browsers without Lenis or before Lenis mounts
    const reset = () => {
      window.scrollTo({ top: 0, behavior: 'instant' })
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }
    reset()
    requestAnimationFrame(reset)
  }, [pathname])

  return null
}

export default ScrollToTop
