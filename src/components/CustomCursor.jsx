import { useEffect, useState, useRef } from 'react'

const CustomCursor = () => {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const [isHover, setIsHover] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia('(hover: none)').matches) {
      setIsMobile(true)
      return
    }

    const dot  = dotRef.current
    const ring = ringRef.current
    let mouseX = 0, mouseY = 0
    let ringX  = 0, ringY  = 0

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%,-50%)`
    }

    // Smooth ring follow
    const animate = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%,-50%)`
      requestAnimationFrame(animate)
    }
    const raf = requestAnimationFrame(animate)

    // Hover detection
    const addHover = () => {
      dot.classList.add('cursor-hover')
      ring.classList.add('cursor-hover')
    }
    const removeHover = () => {
      dot.classList.remove('cursor-hover')
      ring.classList.remove('cursor-hover')
    }

    const interactables = 'a, button, [role="button"], input, textarea, select, label, .project-card, .glass-card-hover'
    document.querySelectorAll(interactables).forEach(el => {
      el.addEventListener('mouseenter', addHover)
      el.addEventListener('mouseleave', removeHover)
    })

    // Also use event delegation for dynamic elements
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest('a, button, [role="button"], input, textarea')) addHover()
    })
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest('a, button, [role="button"], input, textarea')) removeHover()
    })

    window.addEventListener('mousemove', onMove)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  if (isMobile) return null

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}

export default CustomCursor
