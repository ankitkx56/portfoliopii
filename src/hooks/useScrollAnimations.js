import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ── Split text into individual chars wrapped in spans ──────────────────────
export const splitChars = (el) => {
  if (!el) return []
  const text = el.textContent
  el.textContent = ''
  const chars = []
  text.split('').forEach(char => {
    const span = document.createElement('span')
    span.textContent = char === ' ' ? '\u00A0' : char
    span.style.display = 'inline-block'
    span.style.overflow = 'hidden'
    el.appendChild(span)
    chars.push(span)
  })
  return chars
}

// ── Split text into lines (word-wrapped) ─────────────────────────────────
export const splitLines = (el) => {
  if (!el) return []
  const words = el.textContent.split(' ')
  el.innerHTML = words.map(w => `<span class="word-wrap" style="display:inline-block;overflow:hidden;vertical-align:bottom"><span class="word-inner" style="display:inline-block">${w}</span></span>`).join(' ')
  return el.querySelectorAll('.word-inner')
}

// ── Hook: Cinematic text reveal on scroll ────────────────────────────────
export const useTextReveal = (ref, options = {}) => {
  useEffect(() => {
    if (!ref.current) return
    const el = ref.current
    const lines = splitLines(el)

    gsap.fromTo(lines,
      { y: '110%', skewX: options.skew ?? 4 },
      {
        y: 0,
        skewX: 0,
        stagger: options.stagger ?? 0.06,
        duration: options.duration ?? 1.1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true,
        },
      }
    )
    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])
}

// ── Hook: Clip-path wipe reveal ──────────────────────────────────────────
export const useClipReveal = (ref, options = {}) => {
  useEffect(() => {
    if (!ref.current) return
    gsap.fromTo(ref.current,
      { clipPath: 'inset(100% 0% 0% 0%)' },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: options.duration ?? 1.4,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          once: true,
        },
      }
    )
    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])
}

// ── Hook: Stagger children fade-up ───────────────────────────────────────
export const useStaggerReveal = (containerRef, childSelector, options = {}) => {
  useEffect(() => {
    if (!containerRef.current) return
    const children = containerRef.current.querySelectorAll(childSelector)
    gsap.fromTo(children,
      { y: options.y ?? 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: options.stagger ?? 0.12,
        duration: options.duration ?? 1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: options.start ?? 'top 80%',
          once: true,
        },
      }
    )
    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])
}
