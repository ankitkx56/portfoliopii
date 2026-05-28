import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { toolSkills } from '../data/portfolio'
import { scrollTA } from '../hooks/useHeroAnimation'

gsap.registerPlugin(ScrollTrigger)

const Skills = () => {
  const pageRef  = useRef(null)
  const barsRef  = useRef(null)
  const cardsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── HERO — no ScrollTrigger ───────────────────────────────── */
      const firstWords = pageRef.current?.querySelectorAll('.first-line .w-inner')
      if (firstWords?.length) {
        gsap.fromTo(firstWords,
          { y: '115%', skewX: 8 },
          { y: 0, skewX: 0, stagger: 0.06, duration: 1.1, ease: 'expo.out', delay: 0.1, clearProps: 'all' }
        )
      }
      // "Toolkit" fades in
      const secondLine = pageRef.current?.querySelector('.second-line')
      if (secondLine) {
        gsap.set(secondLine, { opacity: 0, y: 55, scale: 0.93 })
        gsap.to(secondLine,
          { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: 'expo.out', delay: 0.5 }
        )
      }
      gsap.fromTo('.skills-sub',
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out', delay: 1.2, clearProps: 'all' }
      )

      /* ── BAR CARDS: trigger early (90%), no inner delays ─────── */
      if (barsRef.current) {
        const cards = barsRef.current.querySelectorAll('.bar-card')
        const tl = gsap.timeline({
          // start at 90% so it fires as soon as section is barely visible
          scrollTrigger: { trigger: barsRef.current, start: 'top 90%', toggleActions: scrollTA },
        })
        // All cards slide in together (stagger 0.08 — faster)
        tl.fromTo(cards,
          { x: -90, opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.08, duration: 0.85, ease: 'expo.out' },
          0
        )
        // Bars fill right after cards appear (no per-card offset delay)
        cards.forEach((card) => {
          const fill = card.querySelector('.bar-fill')
          if (!fill) return
          tl.fromTo(fill,
            { width: '0%' },
            { width: `${fill.dataset.width}%`, duration: 1.2, ease: 'expo.out' },
            0.15   // ← small fixed offset, not accumulating per card
          )
        })
      }

      /* ── FEATURE CARDS: trigger at 90% ──────────────────────── */
      if (cardsRef.current) {
        const heading1 = cardsRef.current.querySelectorAll('.feat-first .w-inner')
        const heading2 = cardsRef.current.querySelector('.feat-second')
        const cards    = cardsRef.current.querySelectorAll('.feat-card')

        const tl = gsap.timeline({
          scrollTrigger: { trigger: cardsRef.current, start: 'top 90%', toggleActions: scrollTA },
        })
        if (heading1.length) tl.fromTo(heading1, { y: '110%' }, { y: 0, stagger: 0.05, duration: 0.9, ease: 'expo.out' }, 0)
        if (heading2) {
          gsap.set(heading2, { opacity: 0, y: 35 })
          tl.to(heading2, { opacity: 1, y: 0, duration: 1.0, ease: 'expo.out' }, 0.3)
        }
        tl.fromTo(cards,
          { y: 70, opacity: 0, rotateX: -12 },
          { y: 0, opacity: 1, rotateX: 0, stagger: 0.08, duration: 0.9, ease: 'back.out(1.5)' },
          0.1
        )
      }

      /* ── HR LINES ─────────────────────────────────────────────── */
      pageRef.current?.querySelectorAll('.hr-line').forEach(line => {
        gsap.fromTo(line,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1, duration: 1.3, ease: 'expo.out',
            scrollTrigger: { trigger: line, start: 'top 92%', toggleActions: scrollTA },
          }
        )
      })

    }, pageRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef} className="min-h-screen pt-20" style={{ background: 'var(--bg-base)' }}>

      {/* ── HERO ────────────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="orb-purple w-96 h-96 top-0 left-0 opacity-20" />
          <div className="orb-gold w-64 h-64 bottom-0 right-0 opacity-10" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <p className="section-label mb-4">Tools & Expertise</p>

          {/* "My Design" — slides up */}
          <div className="overflow-hidden">
            <div className="first-line text-5xl md:text-7xl lg:text-8xl font-display font-black text-white">
              {'My Design'.split(' ').map((word, i) => (
                <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', marginRight: '0.3em' }}>
                  <span className="w-inner" style={{ display: 'inline-block' }}>{word}</span>
                </span>
              ))}
            </div>
          </div>

          {/* "Toolkit" — fades in (NO inline opacity:0 — gsap.set handles it) */}
          <div className="second-line text-5xl md:text-7xl lg:text-8xl font-display font-black gradient-text">
            Toolkit
          </div>

          <p className="skills-sub mt-6 text-lg max-w-lg" style={{ color: 'var(--text-secondary)' }}>
            Six tools I work with daily to bring every design to life.
          </p>
        </div>
      </section>

      <hr className="hr-line hr-gradient" style={{ transform: 'scaleX(0)' }} />

      {/* ── SKILL BARS — one single % shown per row ─────────────── */}
      <section ref={barsRef} className="py-20" style={{ background: '#0a0a14' }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="mb-12">
            <p className="section-label mb-3">Proficiency</p>
            <h2 className="text-3xl md:text-4xl font-display font-black text-white">Skill Levels</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {toolSkills.map((skill, i) => (
              <div key={i} className="bar-card glass-card-hover rounded-2xl p-6" style={{ opacity: 0 }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl p-2.5 flex-shrink-0 relative"
                      style={{
                        background: skill.bg || 'rgba(139,92,246,0.1)',
                        boxShadow: skill.whiteGlow
                          ? '0 0 12px 2px rgba(255,255,255,0.20)'
                          : `0 0 12px 1px ${skill.color}28`,
                      }}>
                      <div className="icon-glow" style={{ '--glow-color': skill.whiteGlow ? 'rgba(255,255,255,0.5)' : `${skill.color}99` }} />
                      <img src={skill.icon} alt={skill.name} className="w-full h-full object-contain relative" style={{ zIndex: 1 }}
                        onError={e => {
                          e.target.style.display = 'none'
                          e.target.parentNode.innerHTML =
                            `<span style="font-size:1.2rem;font-weight:900;color:${skill.color};position:relative;z-index:1">${skill.name.slice(0,2)}</span>`
                        }} />
                    </div>
                    <h3 className="font-display font-bold text-white">{skill.name}</h3>
                  </div>
                  {/* % shown ONCE — on the right */}
                  <span className="text-sm font-mono font-bold gradient-text">{skill.level}%</span>
                </div>
                <div className="skill-bar-track">
                  <div className="bar-fill skill-bar-fill" data-width={skill.level} style={{ width: '0%' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="hr-line hr-gradient" style={{ transform: 'scaleX(0)' }} />

      {/*
       * ── FEATURE CARDS — NO % here (already shown in bars above)
       * Only shows: icon, name, and what I use that tool for
       */}
      <section ref={cardsRef} className="py-20" style={{ background: 'var(--bg-base)' }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="mb-14">
            <p className="section-label mb-3">In Depth</p>
            <div className="overflow-hidden">
              <div className="feat-first text-3xl md:text-5xl font-display font-black text-white">
                {'How I'.split(' ').map((w, i) => (
                  <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', marginRight: '0.3em' }}>
                    <span className="w-inner" style={{ display: 'inline-block' }}>{w}</span>
                  </span>
                ))}
              </div>
            </div>
            {/* "Use Them" fades — NO inline opacity:0, gsap.set handles it */}
            <div className="feat-second text-3xl md:text-5xl font-display font-black gradient-text">
              Use Them
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" style={{ perspective: '1000px' }}>
            {[
              { skill: toolSkills[0], use: 'Photo editing, compositing, social media graphics, poster design, and retouching.' },
              { skill: toolSkills[1], use: 'Vector logos, brand identity, illustrations, packaging artwork, and icon design.' },
              { skill: toolSkills[2], use: 'Print design, large-format graphics, canopy banners, and branding materials.' },
              { skill: toolSkills[3], use: 'Brochures, magazines, multi-page print layouts, and marketing collateral.' },
              { skill: toolSkills[4], use: 'Photo colour grading, product photography edits, and visual consistency.' },
              { skill: toolSkills[5], use: 'UI/UX wireframing, prototype design, and digital design collaboration.' },
            ].map(({ skill, use }, i) => (
              <div
                key={skill.name}
                className="feat-card rounded-2xl p-6 flex flex-col gap-4 group cursor-default"
                style={{
                  background:     'rgba(255,255,255,0.02)',
                  border:         `1px solid ${skill.color}25`,
                  opacity:        0,
                  transformStyle: 'preserve-3d',
                  transition:     'border-color 0.3s ease, box-shadow 0.3s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = `${skill.color}60`
                  e.currentTarget.style.boxShadow   = `0 0 30px ${skill.color}18, inset 0 0 40px ${skill.color}05`
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = `${skill.color}25`
                  e.currentTarget.style.boxShadow   = 'none'
                }}
              >
                {/* Icon only — no % here */}
                <div className="w-12 h-12 rounded-xl p-2.5 relative"
                  style={{
                    background: skill.bg || 'rgba(139,92,246,0.1)',
                    boxShadow: skill.whiteGlow
                      ? '0 0 12px 2px rgba(255,255,255,0.20)'
                      : `0 0 12px 1px ${skill.color}28, inset 0 0 6px ${skill.color}0d`,
                  }}>
                  <div className="icon-glow" style={{ '--glow-color': skill.whiteGlow ? 'rgba(255,255,255,0.5)' : `${skill.color}99` }} />
                  <img src={skill.icon} alt={skill.name} className="w-full h-full object-contain relative" style={{ zIndex: 1 }}
                    onError={e => {
                      e.target.style.display = 'none'
                      e.target.parentNode.innerHTML =
                        `<span style="font-size:1.4rem;font-weight:900;color:${skill.color}">${skill.name.slice(0,2)}</span>`
                    }} />
                </div>

                <h3 className="font-display font-black text-white text-lg">{skill.name}</h3>
                <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--text-secondary)' }}>{use}</p>

                {/* Accent bar — decorative, no % label */}
                <div className="h-0.5 rounded-full w-full" style={{ background: `${skill.color}20` }}>
                  <div className="h-full rounded-full" style={{ width: `${skill.level}%`, background: `linear-gradient(90deg,${skill.color},${skill.color}44)` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Skills
