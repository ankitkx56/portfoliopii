import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    // Use immediate scroll reset (mobile + Lenis friendly)
    const reset = () => {
      window.scrollTo(0, 0)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }

    reset()
    // Some mobile browsers / smooth-scroll libraries apply scroll after paint
    requestAnimationFrame(reset)
    setTimeout(reset, 0)
  }, [pathname])

  return null
}

export default ScrollToTop

