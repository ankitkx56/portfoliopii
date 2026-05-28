import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects, categories } from '../data/projects'
import { FiArrowRight } from 'react-icons/fi'
import { scrollTA } from '../hooks/useHeroAnimation'

gsap.registerPlugin(ScrollTrigger)

const Work = () => {
  const [activeFilter, setActiveFilter] = useState('All')
  const pageRef = useRef(null)
  const gridRef = useRef(null)

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter)

  // Hero — no ScrollTrigger (fixes tab switch)
  useEffect(() => {
    const ctx = gsap.context(() => {
      // "Selected" slides up
      const firstWords = pageRef.current?.querySelectorAll('.first-line .w-inner')
      if (firstWords?.length) {
        gsap.fromTo(firstWords,
          { y: '115%', skewX: 8 },
          { y: 0, skewX: 0, stagger: 0.06, duration: 1.1, ease: 'expo.out', delay: 0.1, clearProps: 'all' }
        )
      }
      // "Work" fades in
      const secondLine = pageRef.current?.querySelector('.second-line')
      if (secondLine) {
        gsap.set(secondLine, { opacity: 0, y: 55, scale: 0.93 })
        gsap.to(secondLine,
          { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: 'expo.out', delay: 0.5 }
        )
      }
      // Sub-text
      gsap.fromTo('.work-sub',
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out', delay: 1.2, clearProps: 'all' }
      )

      pageRef.current?.querySelectorAll('.hr-line').forEach(line => {
        gsap.fromTo(line,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1, duration: 1.4, ease: 'expo.out',
            scrollTrigger: { trigger: line, start: 'top 90%', toggleActions: scrollTA },
          }
        )
      })
    }, pageRef)
    return () => ctx.revert()
  }, [])

  // Grid animation on filter change
  useEffect(() => {
    if (!gridRef.current) return
    const cards = gridRef.current.querySelectorAll('.proj-card')
    gsap.fromTo(cards,
      { y: 80, opacity: 0, clipPath: 'inset(15% 0% 0% 0%)' },
      { y: 0, opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', stagger: 0.1, duration: 1, ease: 'expo.out', clearProps: 'all' }
    )
  }, [activeFilter])

  return (
    <div ref={pageRef} className="min-h-screen pt-20" style={{ background: 'var(--bg-base)' }}>

      {/* ── HERO ────────────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="orb-purple w-96 h-96 top-0 right-0 opacity-20" />
          <div className="absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: 'linear-gradient(rgba(139,92,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <p className="section-label mb-4">Portfolio</p>

          {/* "Selected" slides up */}
          <div className="overflow-hidden">
            <div className="first-line text-5xl md:text-7xl lg:text-8xl font-display font-black text-white">
              {'Selected'.split(' ').map((word, i) => (
                <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', marginRight: '0.3em' }}>
                  <span className="w-inner" style={{ display: 'inline-block' }}>{word}</span>
                </span>
              ))}
            </div>
          </div>

          {/* "Work" fades in — gsap.set handles initial hide */}
          <div className="second-line text-5xl md:text-7xl lg:text-8xl font-display font-black gradient-text">
            Work
          </div>

          <p className="work-sub mt-6 text-lg max-w-xl" style={{ color: 'var(--text-secondary)', opacity: 0 }}>
            Branding · Social Media · Posters · Print · Packaging — bold visuals, clean layouts.
          </p>
        </div>
      </section>

      {/* ── FILTER BAR ──────────────────────────────────────────────── */}
      <div className="sticky top-20 z-30 py-4"
        style={{ background: 'rgba(6,11,20,0.92)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--bg-border)' }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveFilter(cat)}
                className="relative flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
                style={{
                  color:      activeFilter === cat ? '#fff' : 'var(--text-muted)',
                  background: activeFilter === cat ? 'var(--primary)' : 'transparent',
                  border:     '1px solid ' + (activeFilter === cat ? 'transparent' : 'var(--bg-border)'),
                }}>
                {activeFilter === cat && (
                  <motion.span layoutId="filter-bg" className="absolute inset-0 rounded-full -z-10"
                    style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
                )}
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── PROJECTS GRID ────────────────────────────────────────────── */}
      <section className="py-16" style={{ background: 'var(--bg-base)' }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <AnimatePresence mode="wait">
            <motion.div key={activeFilter} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
              <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((project) => (
                  <div key={project.id} className="proj-card group rounded-2xl overflow-hidden"
                    style={{ background: 'var(--bg-card)', border: '1px solid var(--bg-border)' }}>
                    <Link to={`/work/${project.id}`}>
                      <div className="relative overflow-hidden aspect-[4/3]">
                        <img src={project.image} alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                        <div className="project-card-overlay" />
                        <div className="absolute inset-0 flex flex-col justify-end p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="tag-gold text-xs">{project.category}</span>
                            <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>{project.year}</span>
                          </div>
                          <h3 className="text-white font-display font-bold text-base leading-tight mb-2">{project.title}</h3>
                          <span className="inline-flex items-center gap-1 text-sm" style={{ color: 'var(--primary-light)' }}>
                            View Project <FiArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                        <div className="absolute top-3 left-3"><span className="tag text-xs">{project.category}</span></div>
                        {project.featured && <div className="absolute top-3 right-3"><span className="tag-gold text-xs">Featured</span></div>}
                      </div>
                      <div className="p-5">
                        <h3 className="font-display font-bold text-white text-sm mb-1 group-hover:text-primary-300 transition-colors">{project.title}</h3>
                        <p className="text-xs line-clamp-2 mb-3" style={{ color: 'var(--text-muted)' }}>{project.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {project.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="text-xs px-2 py-0.5 rounded font-mono"
                              style={{ background: 'rgba(139,92,246,0.08)', color: 'var(--text-muted)' }}>{tag}</span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}

export default Work
