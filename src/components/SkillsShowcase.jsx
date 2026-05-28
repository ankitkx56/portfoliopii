import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { toolSkills } from '../data/portfolio'

gsap.registerPlugin(ScrollTrigger)

/**
 * SkillsShowcase
 *
 * FIXED:
 * • Strictly sequential — icon N must FULLY settle before icon N+1 starts
 * • Horizontal layout — all 6 icons in ONE row (flex-row, wraps on mobile)
 * • Title "My Design Skills" is one horizontal line (not stacked)
 * • Auto-reverses on scroll-back (scrub)
 * • No % level duplicated here
 */
const SkillsShowcase = () => {
  const sectionRef = useRef(null)
  const iconsRef   = useRef(null)
  const titleRef   = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const row     = iconsRef.current
    if (!section || !row) return

    const cards = Array.from(row.querySelectorAll('.ski-card'))
    const vw    = window.innerWidth

    /*
     * Timeline units per card (normalised):
     *   phase 1 (fly + zoom):  0.40 units
     *   phase 2 (settle):      0.20 units
     *   total per card:        0.60 units
     *
     * Card N starts only AFTER card N-1 has fully settled:
     *   cardStart[i] = titleDuration + i * 0.60
     *
     * Title:                   0 → 0.25
     * Card 0:                  0.25 → 0.85
     * Card 1:                  0.85 → 1.45
     * ...
     * Card 5:                  3.25 → 3.85
     * Total timeline:          ~4.1 units
     *
     * We map 4.1 units to a scroll distance of 4.1 × 500px = 2050px
     */
    const UNIT_PX   = vw < 768 ? 380 : 520   // px per timeline unit
    const PER_CARD  = 0.60
    const T_TITLE   = 0.25
    const totalTime = T_TITLE + cards.length * PER_CARD   // ≈ 3.85
    const scrollLen = Math.round(totalTime * UNIT_PX)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger:       section,
        start:         'top top',
        end:           `+=${scrollLen}`,
        scrub:         1.8,
        pin:           true,
        anticipatePin: 1,
      },
    })

    // ── Title fades in first ──────────────────────────────────────
    const titleEl = titleRef.current
    if (titleEl) {
      tl.fromTo(titleEl,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0,  duration: T_TITLE, ease: 'power3.out' },
        0
      )
    }

    // ── Each card: sequential (N+1 NEVER starts before N settles) ─
    cards.forEach((card, i) => {
      const cardStart = T_TITLE + i * PER_CARD

      // Phase 1: fly from far left → settle position, peak zoom 1.7×
      tl.fromTo(card,
        { x: -(vw * 1.5), scale: 0.3, opacity: 0, rotateY: -60, filter: 'blur(10px)' },
        { x: 0,            scale: 1.7, opacity: 1, rotateY: 0,   filter: 'blur(0px)',
          duration: 0.40, ease: 'power3.out' },
        cardStart
      )

      // Phase 2: scale collapses to 1 — icon "snaps into place"
      tl.to(card,
        { scale: 1, duration: 0.20, ease: 'expo.inOut' },
        cardStart + 0.40
      )
    })

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: '#07080f' }}
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="orb-purple w-[700px] h-[700px] top-1/2 -translate-y-1/2 right-[-10%] opacity-15" />
        <div className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'linear-gradient(rgba(139,92,246,0.7) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,0.7) 1px,transparent 1px)',
            backgroundSize:  '60px 60px',
          }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12">

        {/* ── Title — ONE horizontal line ──────────────────────────── */}
        <div ref={titleRef} className="mb-14" style={{ opacity: 0 }}>
          <p className="section-label mb-3">Skills</p>
          {/* All three words on the same line */}
          <h2 className="font-display font-black text-white whitespace-nowrap"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', lineHeight: 1 }}>
            My{' '}
            <span className="gradient-text">Design</span>{' '}
            Skills
          </h2>
          <p className="mt-3 text-sm" style={{ color: 'var(--text-muted)' }}>
            Tools I use daily to bring designs to life
          </p>
        </div>

        {/*
         * ── Icons — HORIZONTAL ROW ────────────────────────────────
         * All 6 in one flex row. They wrap on mobile (3+3).
         * Each card starts invisible; GSAP animates them in from the left.
         */}
        <div
          ref={iconsRef}
          className="flex flex-wrap gap-4 sm:gap-5 lg:gap-6"
          style={{ perspective: '1200px' }}
        >
          {toolSkills.map((skill) => (
            <div
              key={skill.name}
              className="ski-card flex flex-col items-center gap-3 rounded-2xl cursor-default"
              style={{
                padding:        '1.25rem',
                width:          'clamp(90px, 14vw, 130px)',
                background:     'rgba(255,255,255,0.03)',
                border:         `1px solid ${skill.color}20`,
                transformStyle: 'preserve-3d',
                willChange:     'transform, opacity',
                opacity:        0,           // GSAP takes over
              }}
            >
              {/* Icon container — pulsing glow BEHIND the image */}
              <div
                className="relative rounded-xl flex items-center justify-center overflow-visible"
                style={{
                  width:      'clamp(48px, 8vw, 60px)',
                  height:     'clamp(48px, 8vw, 60px)',
                  padding:    '0.4rem',
                  background: skill.bg,
                  border:     '1px solid rgba(255,255,255,0.12)',
                  boxShadow:  skill.whiteGlow
                    ? '0 0 14px 3px rgba(255,255,255,0.22)'
                    : `0 0 14px 2px ${skill.color}30`,
                }}
              >
                {/* Breathing glow orb — lives BEHIND the img via z-index */}
                <div
                  className="icon-glow"
                  style={{
                    '--glow-color': skill.whiteGlow
                      ? 'rgba(255,255,255,0.55)'
                      : `${skill.color}99`,
                  }}
                />
                <img
                  src={skill.icon}
                  alt={skill.name}
                  className="w-full h-full object-contain relative"
                  style={{ zIndex: 1 }}
                  draggable={false}
                  onError={e => {
                    e.target.style.display = 'none'
                    e.target.parentNode.innerHTML =
                      `<span style="font-size:1.2rem;font-weight:900;color:${skill.color};position:relative;z-index:1">${skill.name.slice(0, 2)}</span>`
                  }}
                />
              </div>

              {/* Name */}
              <p className="text-xs font-bold text-white text-center leading-tight">{skill.name}</p>

              {/* Colour dot — no % bar here */}
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: skill.color, boxShadow: `0 0 8px ${skill.color}` }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SkillsShowcase
