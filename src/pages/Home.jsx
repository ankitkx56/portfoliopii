import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { designer, services } from '../data/portfolio'
import { getFeaturedProjects } from '../data/projects'
import { FiArrowRight, FiArrowDown } from 'react-icons/fi'
import { FaBehance, FaInstagram, FaLinkedin } from 'react-icons/fa'
import SkillsShowcase from '../components/SkillsShowcase'
import { scrollTA } from '../hooks/useHeroAnimation'

gsap.registerPlugin(ScrollTrigger)

const floatingLogos = [
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg',     alt: 'Ps', style: { top: '14%',   left:  '5%'  }, delay: 0,   dur: 9  },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg', alt: 'Ai', style: { top: '20%',   right: '5%'  }, delay: 0.5, dur: 11 },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',          alt: 'Fg', style: { bottom: '20%',left:  '7%'  }, delay: 1,   dur: 10 },
  { src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 60'%3E%3Crect width='60' height='60' rx='10' fill='%232B0A14'/%3E%3Ctext x='30' y='43' font-family='Arial Black,Arial,sans-serif' font-size='32' font-weight='900' fill='%23FF3366' text-anchor='middle'%3EId%3C/text%3E%3C/svg%3E", alt: 'Id', style: { bottom: '14%',right: '7%'  }, delay: 1.5, dur: 12 },
]

const socialLinks = [
  { icon: FaBehance,   href: designer.social.behance,   label: 'Behance'   },
  { icon: FaInstagram, href: designer.social.instagram, label: 'Instagram' },
  { icon: FaLinkedin,  href: designer.social.linkedin,  label: 'LinkedIn'  },
]

/* ── Masked-word line component (first-line style) ─────────────────────── */
const FirstLine = ({ text, className }) => (
  <div className="overflow-hidden">
    <div className={`first-line ${className}`}>
      {text.split(' ').map((word, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', marginRight: '0.28em' }}>
          <span className="w-inner" style={{ display: 'inline-block' }}>{word}</span>
        </span>
      ))}
    </div>
  </div>
)

const Home = () => {
  const pageRef  = useRef(null)
  const heroRef  = useRef(null)
  const workRef  = useRef(null)
  const servRef  = useRef(null)
  const ctaRef   = useRef(null)
  
  // Interactive orb elements refs (antigravity style cursor attraction)
  const heroSectionRef = useRef(null)
  const orbPurpleRef = useRef(null)
  const orbGoldRef = useRef(null)

  const featuredProjects = getFeaturedProjects()

  // Interactive background orbs (antigravity style cursor attraction + self-floating)
  useEffect(() => {
    const hero = heroSectionRef.current
    const orbPurple = orbPurpleRef.current
    const orbGold = orbGoldRef.current
    if (!hero || !orbPurple || !orbGold) return

    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      active: false,
      timeout: null
    }

    const logoContainers = hero.querySelectorAll('.floating-logo-container')
    const factors = [0.16, 0.08, 0.12, 0.06]

    const onMouseMove = (e) => {
      const rect = hero.getBoundingClientRect()
      mouse.targetX = e.clientX - rect.left - rect.width / 2
      mouse.targetY = e.clientY - rect.top - rect.height / 2

      // Reset the inactivity timeout: return to normal space after 1 second of no movement
      if (mouse.timeout) clearTimeout(mouse.timeout)
      mouse.timeout = setTimeout(() => {
        mouse.targetX = 0
        mouse.targetY = 0
      }, 1000)
    }

    const onMouseEnter = () => {
      mouse.active = true
    }

    const onMouseLeave = () => {
      mouse.active = false
      if (mouse.timeout) clearTimeout(mouse.timeout)
      mouse.targetX = 0
      mouse.targetY = 0
    }

    hero.addEventListener('mousemove', onMouseMove)
    hero.addEventListener('mouseenter', onMouseEnter)
    hero.addEventListener('mouseleave', onMouseLeave)

    let currentX = 0
    let currentY = 0
    let frameId;
    let time = 0;

    const update = () => {
      time += 0.005; // speed of floating

      // Continuous float offsets (sine wave self-floating)
      const floatPurpleX = Math.sin(time) * 45
      const floatPurpleY = Math.cos(time * 1.3) * 40
      
      const floatGoldX = Math.cos(time * 0.9) * 35
      const floatGoldY = Math.sin(time * 1.1) * 35

      // Mouse attraction lerp (smooth spring/inertia lag)
      currentX += (mouse.targetX - currentX) * 0.04
      currentY += (mouse.targetY - currentY) * 0.04

      // Only animate if the hero is visible on screen
      const scrollY = window.scrollY
      const heroHeight = rect?.height || hero.offsetHeight
      
      if (scrollY < heroHeight + 100) {
        // Purple orb: direct attraction
        gsap.set(orbPurple, {
          x: floatPurpleX + currentX * 0.28,
          y: floatPurpleY + currentY * 0.28
        })

        // Gold orb: opposite direction for 3D depth parallax
        gsap.set(orbGold, {
          x: floatGoldX - currentX * 0.15,
          y: floatGoldY - currentY * 0.15
        })

        // Floating tool logos: parallax cursor attraction
        logoContainers.forEach((container) => {
          const idx = parseInt(container.getAttribute('data-index') || '0', 10)
          const factor = factors[idx] || 0.1
          gsap.set(container, {
            x: currentX * factor,
            y: currentY * factor
          })
        })
      }

      frameId = requestAnimationFrame(update)
    }

    let rect = hero.getBoundingClientRect()
    
    const onResize = () => {
      if (hero) rect = hero.getBoundingClientRect()
    }
    window.addEventListener('resize', onResize)

    frameId = requestAnimationFrame(update)

    return () => {
      hero.removeEventListener('mousemove', onMouseMove)
      hero.removeEventListener('mouseenter', onMouseEnter)
      hero.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('resize', onResize)
      if (mouse.timeout) clearTimeout(mouse.timeout)
      cancelAnimationFrame(frameId)
    }
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── HERO — no ScrollTrigger ───────────────────────────────── */
      // Line 1 "Piyush": chars fly in (3D)
      const nameChars = heroRef.current?.querySelectorAll('.name-char')
      if (nameChars?.length) {
        gsap.fromTo(nameChars,
          { y: '130%', rotateX: -80, opacity: 0 },
          { y: 0, rotateX: 0, opacity: 1, duration: 1.1, stagger: 0.04, ease: 'expo.out', delay: 0.15, clearProps: 'all' }
        )
      }

      // Line 2 "Das" — FADE IN after first name chars
      const nameLine2 = heroRef.current?.querySelector('.name-line2')
      if (nameLine2) {
        gsap.fromTo(nameLine2,
          { opacity: 0, y: 55, scale: 0.94 },
          { opacity: 1, y: 0, scale: 1, duration: 1.4, ease: 'expo.out', delay: 0.5, clearProps: 'all' }
        )
      }

      // Brand + tagline + socials
      gsap.fromTo(['.hero-brand', '.hero-tagline', '.hero-ctas', '.hero-socials', '.scroll-hint'],
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'expo.out', delay: 1.1, clearProps: 'all' }
      )

      /* ── PARALLAX (scrub = auto-reverses) ──────────────────────── */
      gsap.to('.hero-parallax', {
        yPercent: 22, ease: 'none',
        scrollTrigger: { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: 1.5 },
      })
      gsap.to('.hero-content', {
        yPercent: -12, opacity: 0, ease: 'none',
        scrollTrigger: { trigger: '.hero-section', start: 'center top', end: 'bottom top', scrub: 1 },
      })

      /* ── SCROLL SECTIONS — toggleActions for reverse ──────────── */
      // Section heading groups
      pageRef.current?.querySelectorAll('.scroll-reveal-group').forEach(group => {
        const label  = group.querySelector('.r-label')
        const words  = group.querySelectorAll('.r-heading .w-inner')
        const second = group.querySelector('.r-heading-2')
        const body   = group.querySelector('.r-body')
        const tl = gsap.timeline({
          scrollTrigger: { trigger: group, start: 'top 80%', toggleActions: scrollTA },
        })
        if (label)  tl.fromTo(label,  { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out' }, 0)
        if (words.length) tl.fromTo(words, { y: '105%' }, { y: 0, stagger: 0.06, duration: 0.9, ease: 'expo.out' }, 0.1)
        if (second) tl.fromTo(second, { opacity: 0, y: 40, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: 'expo.out' }, 0.4)
        if (body)   tl.fromTo(body,   { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out' }, 0.35)
      })

      // Featured cards
      if (workRef.current) {
        gsap.fromTo(workRef.current.querySelectorAll('.proj-card'),
          { y: 100, opacity: 0, clipPath: 'inset(20% 0% 0% 0%)' },
          {
            y: 0, opacity: 1, clipPath: 'inset(0% 0% 0% 0%)',
            stagger: 0.13, duration: 1, ease: 'expo.out',
            scrollTrigger: { trigger: workRef.current, start: 'top 80%', toggleActions: scrollTA },
          }
        )
      }

      // Service cards alternating x
      if (servRef.current) {
        servRef.current.querySelectorAll('.serv-card').forEach((card, i) => {
          gsap.fromTo(card,
            { x: i % 2 === 0 ? -70 : 70, opacity: 0, scale: 0.94 },
            {
              x: 0, opacity: 1, scale: 1, duration: 0.9, ease: 'expo.out',
              scrollTrigger: { trigger: card, start: 'top 84%', toggleActions: scrollTA },
            }
          )
        })
      }

      // CTA
      if (ctaRef.current) {
        gsap.fromTo(ctaRef.current.querySelector('.cta-title'),
          { scale: 0.85, opacity: 0, y: 50 },
          {
            scale: 1, opacity: 1, y: 0, duration: 1.1, ease: 'expo.out',
            scrollTrigger: { trigger: ctaRef.current, start: 'top 78%', toggleActions: scrollTA },
          }
        )
        gsap.fromTo(ctaRef.current.querySelector('.cta-body'),
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: 'expo.out',
            scrollTrigger: { trigger: ctaRef.current, start: 'top 78%', toggleActions: scrollTA },
          }
        )
      }

      // HR lines
      pageRef.current?.querySelectorAll('.hr-line').forEach(line => {
        gsap.fromTo(line,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1, duration: 1.3, ease: 'expo.out',
            scrollTrigger: { trigger: line, start: 'top 90%', toggleActions: scrollTA },
          }
        )
      })

    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef} className="min-h-screen" style={{ background: 'var(--bg-base)' }}>

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section ref={heroSectionRef} className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="hero-parallax absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{ background: 'var(--hero-gradient)' }} />
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: 'linear-gradient(rgba(139,92,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
          <div ref={orbPurpleRef} className="orb-purple w-[700px] h-[700px] top-1/4 -left-48 opacity-20" />
          <div ref={orbGoldRef} className="orb-gold    w-[500px] h-[500px] bottom-0  right-0  opacity-10" />
        </div>

        {/* Floating logos */}
        <div className="pointer-events-none absolute inset-0 block">
          {floatingLogos.map((logo, index) => (
            <div
              key={logo.alt}
              className="floating-logo-container absolute"
              style={logo.style}
              data-index={index}
            >
              <motion.img src={logo.src} alt={logo.alt}
                className="w-7 sm:w-10 xl:w-14 drop-shadow-2xl"
                style={{ opacity: 0.4 }}
                animate={{ y: [0, -20, -8, 0], rotate: [0, 5, -3, 0] }}
                transition={{ duration: logo.dur, repeat: Infinity, ease: 'easeInOut', delay: logo.delay }}
              />
            </div>
          ))}
        </div>

        <div ref={heroRef} className="hero-content relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center pt-24 pb-16">

          {/* Badge */}
          <div className="hero-ctas inline-flex items-center gap-2 mb-8">
            <span className="tag">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" />
              Open to Work — 2026
            </span>
          </div>

          {/* Name — "Piyush Das" on ONE horizontal line
               "Piyush" chars fly in, then "Das" fades in on the same line */}
          <div
            className="font-display font-black leading-[0.88]"
            style={{
              fontSize: 'clamp(3rem, 10vw, 9rem)',
              perspective: '800px',
              perspectiveOrigin: 'center',
            }}
            aria-label="Piyush Das"
          >
            {'Piyush'.split('').map((char, i) => (
              <span key={i} className="name-char inline-block text-white"
                style={{ display: 'inline-block' }}>
                {char}
              </span>
            ))}
            {/* Space */}
            <span className="inline-block">&nbsp;</span>
            {/* "Das" fades in on the SAME line */}
            <span className="name-line2 inline-block gradient-text" style={{ opacity: 0 }}>
              Das
            </span>
          </div>

          {/* Brand */}
          <p className="hero-brand text-xl md:text-2xl font-display font-bold gradient-text mb-2 mt-1">
            Design Ritual
          </p>

          {/* Tagline */}
          <p className="hero-tagline text-base md:text-lg max-w-xl mx-auto mb-8 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Graphic designer · Branding · Social Media · Posters · Print · Packaging
          </p>

          {/* CTAs */}
          <div className="hero-ctas flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link to="/work" className="btn-primary gap-2">
              View My Work <FiArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/about" className="btn-outline gap-2">About Me</Link>
          </div>

          {/* Social icons */}
          <div className="hero-socials flex items-center justify-center gap-3 mb-20">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer"
                aria-label={label} whileHover={{ y: -4, scale: 1.15 }} whileTap={{ scale: 0.92 }}
                className="w-9 h-9 flex items-center justify-center rounded-full glass-card">
                <Icon className="w-3.5 h-3.5" style={{ color: 'var(--text-secondary)' }} />
              </motion.a>
            ))}
          </div>

          {/* Scroll hint */}
          <div className="scroll-hint absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <span className="text-xs font-mono tracking-widest" style={{ color: 'var(--text-muted)' }}>SCROLL</span>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
              <FiArrowDown className="w-4 h-4" style={{ color: 'var(--primary-light)' }} />
            </motion.div>
          </div>
        </div>
      </section>

      <hr className="hr-line hr-gradient" style={{ transform: 'scaleX(0)' }} />

      {/* ── SKILLS SHOWCASE ─────────────────────────────────────────── */}
      <SkillsShowcase />

      <hr className="hr-line hr-gradient" style={{ transform: 'scaleX(0)' }} />

      {/* ── FEATURED WORK ───────────────────────────────────────────── */}
      <section className="py-24" style={{ background: '#0a0a14' }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="scroll-reveal-group flex items-end justify-between mb-14">
            <div>
              <p className="r-label section-label mb-2">Portfolio</p>
              <div className="overflow-hidden">
                <h2 className="r-heading text-4xl md:text-5xl font-display font-black text-white">
                  {'Featured'.split(' ').map((w, i) => (
                    <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', marginRight: '0.3em' }}>
                      <span className="w-inner" style={{ display: 'inline-block' }}>{w}</span>
                    </span>
                  ))}
                </h2>
              </div>
              {/* "Work" fades in as second word */}
              <div className="r-heading-2 text-4xl md:text-5xl font-display font-black gradient-text" style={{ opacity: 0 }}>
                Work
              </div>
            </div>
            <Link to="/work" className="hidden md:flex items-center gap-2 text-sm font-medium link-underline hover:text-white mb-2"
              style={{ color: 'var(--text-secondary)' }}>
              All Projects <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div ref={workRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <div key={project.id} className="proj-card group rounded-2xl overflow-hidden"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--bg-border)' }}>
                <Link to={`/work/${project.id}`}>
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img src={project.image} alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                    <div className="project-card-overlay" />
                    <div className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500">
                      <span className="tag-gold mb-2 w-fit text-xs">{project.category}</span>
                      <h3 className="text-white font-display font-bold text-base leading-tight">{project.title}</h3>
                      <span className="inline-flex items-center gap-1 mt-2 text-sm" style={{ color: 'var(--primary-light)' }}>
                        View Project <FiArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                    <div className="absolute top-3 left-3"><span className="tag text-xs">{project.category}</span></div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display font-bold text-white text-sm mb-1 group-hover:text-primary-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs line-clamp-2" style={{ color: 'var(--text-muted)' }}>{project.description}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="hr-line hr-gradient" style={{ transform: 'scaleX(0)' }} />

      {/* ── WHAT I DESIGN ────────────────────────────────────────────── */}
      <section className="py-24" style={{ background: 'var(--bg-base)' }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="scroll-reveal-group max-w-xl mb-14">
            <p className="r-label section-label mb-3">Disciplines</p>
            <div className="overflow-hidden">
              <h2 className="r-heading text-4xl md:text-5xl font-display font-black text-white">
                {'What I'.split(' ').map((w, i) => (
                  <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', marginRight: '0.3em' }}>
                    <span className="w-inner" style={{ display: 'inline-block' }}>{w}</span>
                  </span>
                ))}
              </h2>
            </div>
            <div className="r-heading-2 text-4xl md:text-5xl font-display font-black gradient-text mb-3" style={{ opacity: 0 }}>Design</div>
            <p className="r-body text-base" style={{ color: 'var(--text-secondary)' }}>
              Bold graphics across branding, social media, print, and packaging — crafted with intention.
            </p>
          </div>

          <div ref={servRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, i) => (
              <div key={i} className="serv-card glass-card-hover rounded-2xl p-6 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold"
                    style={{ color: i % 2 === 0 ? 'var(--primary-light)' : 'var(--accent-light)' }}>
                    {service.icon}
                  </span>
                  <span className={i % 2 === 0 ? 'tag' : 'tag-gold'}>{service.badge}</span>
                </div>
                <h3 className="text-lg font-display font-bold text-white">{service.title}</h3>
                <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--text-secondary)' }}>{service.description}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {service.tags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded font-mono"
                      style={{ background: 'rgba(139,92,246,0.08)', color: 'var(--text-muted)' }}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="hr-line hr-gradient" style={{ transform: 'scaleX(0)' }} />

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section ref={ctaRef} className="py-28 relative overflow-hidden" style={{ background: '#060812' }}>
        <div className="pointer-events-none absolute inset-0">
          <div className="orb-purple w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <p className="section-label mb-4">Let's Connect</p>
          <h2 className="cta-title text-4xl md:text-6xl font-display font-black text-white mb-4 leading-tight">
            Interested in Working Together?
          </h2>
          <p className="cta-body text-base mb-10" style={{ color: 'var(--text-secondary)' }}>
            Reach out on Instagram or Behance — always open to creative projects.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={designer.social.behance} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Behance <FaBehance className="w-4 h-4" />
            </a>
            <a href={designer.social.instagram} target="_blank" rel="noopener noreferrer" className="btn-outline">
              <FaInstagram className="w-4 h-4" /> @design.ritual
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
