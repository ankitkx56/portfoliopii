import { useEffect, useRef } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getProjectById, projects } from '../data/projects'
import { FiArrowLeft, FiArrowRight, FiExternalLink } from 'react-icons/fi'

gsap.registerPlugin(ScrollTrigger)

const ProjectDetail = () => {
  const { id }     = useParams()
  const navigate   = useNavigate()
  const heroRef    = useRef(null)
  const project    = getProjectById(id)
  const currentIdx = projects.findIndex(p => p.id === parseInt(id))
  const nextProject = projects[(currentIdx + 1) % projects.length]

  useEffect(() => {
    window.scrollTo(0, 0)
    if (!project) return

    // Parallax hero image
    gsap.to('.detail-hero-img', {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [id, project])

  if (!project) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center" style={{ background: 'var(--bg-base)' }}>
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold text-white mb-4">Project Not Found</h1>
          <Link to="/work" className="btn-primary">← Back to Work</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20" style={{ background: 'var(--bg-base)' }}>

      {/* ── Back ─────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-8 pb-4">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-sm transition-colors hover:text-white"
            style={{ color: 'var(--text-secondary)' }}
          >
            <FiArrowLeft className="w-4 h-4" /> Back to Work
          </Link>
        </motion.div>
      </div>

      {/* ── Hero Image ──────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative overflow-hidden" style={{ height: '55vh', minHeight: '350px' }}>
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="detail-hero-img w-full h-full object-cover scale-110"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(6,11,20,0.3) 0%, rgba(6,11,20,0.85) 100%)' }} />
        </div>

        {/* Hero labels */}
        <div className="absolute bottom-8 left-0 right-0">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="tag">{project.category}</span>
                <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>{project.year}</span>
                {project.featured && <span className="tag-gold">Featured</span>}
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white max-w-3xl leading-tight">
                {project.title}
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Content ─────────────────────────────────────────────────── */}
      <section className="py-16" style={{ background: 'var(--bg-base)' }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Project meta */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <div className="glass-card rounded-2xl p-7 space-y-6 sticky top-28">
                <div>
                  <p className="section-label mb-1">Client</p>
                  <p className="text-white font-semibold">{project.client}</p>
                </div>
                <div>
                  <p className="section-label mb-1">Year</p>
                  <p className="text-white font-semibold">{project.year}</p>
                </div>
                <div>
                  <p className="section-label mb-1">Category</p>
                  <span className="tag">{project.category}</span>
                </div>
                <div>
                  <p className="section-label mb-3">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-xs px-2 py-1 rounded font-mono"
                        style={{ background: 'rgba(139,92,246,0.08)', color: 'var(--text-muted)' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="section-label mb-3">Deliverables</p>
                  <ul className="space-y-2">
                    {project.deliverables.map(d => (
                      <li key={d} className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                        <span style={{ color: 'var(--primary-light)' }}>✦</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-8"
            >
              <div>
                <p className="section-label mb-3">Overview</p>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-6">Project Brief</h2>
                <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {project.longDescription}
                </p>
              </div>

              {/* Second image (alternate view) */}
              <div className="rounded-2xl overflow-hidden aspect-video">
                <img
                  src={project.image}
                  alt={`${project.title} detail`}
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Each element of this project was crafted with meticulous attention to detail — ensuring visual consistency, strategic communication, and memorable impact across all deliverables.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Next Project ─────────────────────────────────────────────── */}
      <section className="py-16 relative overflow-hidden" style={{ background: '#0a0a14', borderTop: '1px solid var(--bg-border)' }}>
        <div className="pointer-events-none absolute inset-0">
          <div className="orb-purple w-96 h-96 top-0 right-0 opacity-15" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <p className="section-label mb-6">Next Project</p>
          <Link to={`/work/${nextProject.id}`} className="group flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="tag">{nextProject.category}</span>
              </div>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-white group-hover:gradient-text transition-all duration-300">
                {nextProject.title}
              </h2>
            </div>
            <motion.div
              whileHover={{ x: 8, scale: 1.1 }}
              className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 ml-6"
              style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))', boxShadow: '0 0 20px rgba(139,92,246,0.4)' }}
            >
              <FiArrowRight className="w-6 h-6 text-white" />
            </motion.div>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default ProjectDetail
