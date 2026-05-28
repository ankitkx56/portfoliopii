import { gsap } from 'gsap'

/**
 * animatePageHero
 *
 * Runs hero text animation on page mount (NO ScrollTrigger).
 * — First line words: heavy slide-up from behind a mask
 * — Second line (gradient word): delayed fade-in from below
 *   so it feels like a dramatic reveal after the first line
 *
 * @param {Element} container   — the page root ref element
 * @param {Object}  options
 *   .firstSel   selector for first-line .w-inner spans  (default '.first-line .w-inner')
 *   .secondSel  selector for second-line element        (default '.second-line')
 *   .subSel     selector for sub-text (tagline)         (default '.hero-sub')
 *   .extraSels  array of extra selectors to fade in     (default [])
 */
export const animatePageHero = (container, options = {}) => {
  if (!container) return

  const {
    firstSel  = '.first-line .w-inner',
    secondSel = '.second-line',
    subSel    = '.hero-sub',
    extraSels = [],
  } = options

  // ── Line 1: words slide up (masked) ──────────────────────────
  const firstWords = container.querySelectorAll(firstSel)
  if (firstWords?.length) {
    gsap.fromTo(firstWords,
      { y: '115%', skewX: 8 },
      {
        y: 0, skewX: 0,
        stagger:    0.06,
        duration:   1.1,
        ease:       'expo.out',
        delay:      0.1,
        clearProps: 'all',
      }
    )
  }

  // ── Line 2: the BIG gradient word fades in from below ────────
  // Intentionally slower and starts AFTER line 1 is halfway through
  // NOTE: use gsap.set + gsap.to (NOT fromTo+clearProps) to avoid
  //       the opacity-flash bug where clearProps resets style="opacity:0"
  const secondEl = container.querySelector(secondSel)
  if (secondEl) {
    gsap.set(secondEl, { opacity: 0, y: 60, scale: 0.95 })
    gsap.to(secondEl, {
      opacity:  1,
      y:        0,
      scale:    1,
      duration: 1.4,
      ease:     'expo.out',
      delay:    0.55,
    })
  }

  // ── Sub-text: plain fade ──────────────────────────────────────
  const subEl = container.querySelector(subSel)
  if (subEl) {
    gsap.set(subEl, { opacity: 0, y: 20 })
    gsap.to(subEl, {
      opacity:  1,
      y:        0,
      duration: 0.9,
      ease:     'expo.out',
      delay:    1.2,
    })
  }

  // ── Extra selectors ───────────────────────────────────────────
  extraSels.forEach((sel, i) => {
    const els = container.querySelectorAll(sel)
    if (els.length) {
      gsap.fromTo(els,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 1.0 + i * 0.1, clearProps: 'all' }
      )
    }
  })
}

/**
 * animateScrollItems
 * Re-usable scroll animation with reversible toggleActions.
 */
export const scrollTA = 'play reverse play reverse'
