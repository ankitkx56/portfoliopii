import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { designer, experience, toolSkills } from '../data/portfolio'
import { FaBehance, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { FiMapPin, FiMail, FiPhone, FiArrowRight } from 'react-icons/fi'
import { scrollTA } from '../hooks/useHeroAnimation'

gsap.registerPlugin(ScrollTrigger)

const socialLinks = [
  { icon: FaBehance,   href: designer.social.behance,   label: 'Behance',   display: 'behance.net/piyushdas9' },
  { icon: FaInstagram, href: designer.social.instagram, label: 'Instagram', display: '@design.ritual'         },
  { icon: FaLinkedin,  href: designer.social.linkedin,  label: 'LinkedIn',  display: 'Piyush Das'             },
]

const About = () => {
  const pageRef   = useRef(null)
  const bioRef    = useRef(null)
  const expRef    = useRef(null)
  const toolsRef  = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── HERO — no ScrollTrigger ───────────────────────────────── */
      // "Hi, I'm" — first line: words slide up
      const firstLineWords = pageRef.current?.querySelectorAll('.first-line .w-inner')
      if (firstLineWords?.length) {
        gsap.fromTo(firstLineWords,
          { y: '115%', skewX: 8 },
          { y: 0, skewX: 0, stagger: 0.07, duration: 1.1, ease: 'expo.out', delay: 0.1, clearProps: 'all' }
        )
      }

      // "Piyush Das" — second line: FADES IN after first line
      const secondLine = pageRef.current?.querySelector('.second-line')
      if (secondLine) {
        gsap.set(secondLine, { opacity: 0, y: 60, scale: 0.93 })
        gsap.to(secondLine,
          { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: 'expo.out', delay: 0.55 }
        )
      }

      // Sub text
      gsap.fromTo('.about-sub',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out', delay: 1.2, clearProps: 'all' }
      )

      /* ── PROFILE CARD ──────────────────────────────────────────── */
      gsap.fromTo('.profile-card',
        { x: -100, opacity: 0, scale: 0.92 },
        {
          x: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'expo.out',
          scrollTrigger: { trigger: '.profile-card', start: 'top 82%', toggleActions: scrollTA },
        }
      )

      /* ── BIO PARAGRAPHS ────────────────────────────────────────── */
      if (bioRef.current) {
        gsap.fromTo(bioRef.current.querySelectorAll('.bio-para'),
          { y: 50, opacity: 0, clipPath: 'inset(0% 0% 100% 0%)' },
          {
            y: 0, opacity: 1, clipPath: 'inset(0% 0% 0% 0%)',
            stagger: 0.16, duration: 1.1, ease: 'expo.out',
            scrollTrigger: { trigger: bioRef.current, start: 'top 78%', toggleActions: scrollTA },
          }
        )
      }

      /* ── EXPERIENCE ─────────────────────────────────────────────── */
      if (expRef.current) {
        const heading = expRef.current.querySelectorAll('.exp-first .w-inner')
        const second  = expRef.current.querySelector('.exp-second')
        const entries = expRef.current.querySelectorAll('.exp-entry')

        const tl = gsap.timeline({
          scrollTrigger: { trigger: expRef.current, start: 'top 88%', toggleActions: scrollTA },
        })
        if (heading.length) tl.fromTo(heading, { y: '110%' }, { y: 0, stagger: 0.05, duration: 0.9, ease: 'expo.out' }, 0)
        if (second) {
          gsap.set(second, { opacity: 0, y: 40 })
          tl.to(second, { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out' }, 0.35)
        }
        tl.fromTo(entries,
          { x: -80, opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.15, duration: 1, ease: 'expo.out' }, 0.2
        )
      }

      /* ── TOOLS ICONS (no bars — just icons row) ─────────────────── */
      if (toolsRef.current) {
        gsap.fromTo(toolsRef.current.querySelectorAll('.tool-icon'),
          { scale: 0.5, opacity: 0, y: 30 },
          {
            scale: 1, opacity: 1, y: 0,
            stagger: 0.08, duration: 0.8, ease: 'back.out(2)',
            scrollTrigger: { trigger: toolsRef.current, start: 'top 82%', toggleActions: scrollTA },
          }
        )
      }

      /* ── CONTACT CARDS ─────────────────────────────────────────── */
      gsap.fromTo('.contact-item',
        { x: 40, opacity: 0 },
        {
          x: 0, opacity: 1, stagger: 0.12, duration: 0.9, ease: 'expo.out',
          scrollTrigger: { trigger: '.contact-section', start: 'top 80%', toggleActions: scrollTA },
        }
      )

      /* ── HR LINES ─────────────────────────────────────────────── */
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
    <div ref={pageRef} className="min-h-screen pt-20" style={{ background: 'var(--bg-base)' }}>

      {/* ── HERO ────────────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="orb-purple w-[500px] h-[500px] top-0 right-0 opacity-20" />
          <div className="absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: 'linear-gradient(rgba(139,92,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <p className="section-label mb-4">About Me</p>

          {/* First line: "Hi, I'm" slides up word-by-word */}
          <div className="overflow-hidden">
            <div className="first-line text-4xl md:text-6xl lg:text-7xl font-display font-black text-white">
              {"Hi, I'm".split(' ').map((word, i) => (
                <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', marginRight: '0.3em' }}>
                  <span className="w-inner" style={{ display: 'inline-block' }}>{word}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Second line: "Piyush Das" fades in — gsap.set handles initial hide */}
          <div
            className="second-line text-5xl md:text-7xl lg:text-9xl font-display font-black gradient-text pb-2"
          >
            Piyush Das
          </div>

          <p className="about-sub mt-5 text-base md:text-lg max-w-2xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {designer.bio}
          </p>
        </div>
      </section>

      <hr className="hr-line hr-gradient" style={{ transform: 'scaleX(0)' }} />

      {/* ── PROFILE + BIO ──────────────────────────────────────────── */}
      <section className="py-20" style={{ background: '#0a0a14' }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Profile card */}
            <div className="profile-card" style={{ opacity: 0 }}>
              <div className="relative w-full max-w-sm mx-auto lg:mx-0">
                <div className="absolute inset-0 rounded-3xl blur-2xl opacity-40"
                  style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.5), rgba(245,158,11,0.3))' }} />
                <div className="relative glass-card rounded-3xl p-8 flex flex-col items-center gap-5">
                  <div className="w-24 h-24 rounded-2xl flex items-center justify-center text-4xl font-black"
                    style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.3), rgba(245,158,11,0.2))' }}>
                    ✦
                  </div>
                  <div className="text-center">
                    <h2 className="text-xl font-display font-black text-white">{designer.name}</h2>
                    <p className="text-sm gradient-text font-semibold">{designer.brand}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{designer.title}</p>
                  </div>
                  <div className="w-full space-y-3 pt-2 border-t" style={{ borderColor: 'var(--bg-border)' }}>
                    <div className="flex items-center gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                      <FiMapPin className="w-4 h-4 text-primary-400 flex-shrink-0" />
                      <span>{designer.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                      <FiPhone className="w-4 h-4 text-primary-400 flex-shrink-0" />
                      <a href={designer.whatsappUrl} target="_blank" rel="noopener noreferrer" className="link-underline hover:text-white transition-colors">{designer.phone}</a>
                    </div>
                    <div className="flex items-center gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                      <FiMail className="w-4 h-4 text-primary-400 flex-shrink-0" />
                      <a href={`mailto:${designer.email}`} className="link-underline hover:text-white transition-colors break-all">{designer.email}</a>
                    </div>
                    {socialLinks.map(({ icon: Icon, href, display }) => (
                      <div key={display} className="flex items-center gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                        <Icon className="w-4 h-4 text-primary-400 flex-shrink-0" />
                        <a href={href} target="_blank" rel="noopener noreferrer"
                          className="link-underline hover:text-white transition-colors break-all">{display}</a>
                      </div>
                    ))}
                  </div>
                  <div className="tag w-full justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block mr-2 animate-pulse" />
                    Open to work
                  </div>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div ref={bioRef} className="space-y-6">
              <div>
                <p className="section-label mb-3 bio-para">Who I Am</p>
                <h2 className="text-3xl md:text-4xl font-display font-black text-white mb-6 bio-para">
                  Graphic Designer &<br /><span className="gradient-text">Visual Creative</span>
                </h2>
              </div>
              <p className="bio-para text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{designer.bio}</p>
              <div className="bio-para">
                <p className="section-label mb-3">I Work On</p>
                <div className="flex flex-wrap gap-2">
                  {['Branding', 'Social Media Posts', 'Posters', 'Print Materials', 'Packaging', 'Marketing Content'].map(s => (
                    <span key={s} className="tag">{s}</span>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-2 bio-para">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    whileHover={{ y: -3, scale: 1.1 }}
                    className="w-10 h-10 flex items-center justify-center rounded-full glass-card hover:border-primary-500 transition-all">
                    <Icon className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="hr-line hr-gradient" style={{ transform: 'scaleX(0)' }} />

      {/* ── EXPERIENCE ──────────────────────────────────────────────── */}
      <section ref={expRef} className="py-20" style={{ background: 'var(--bg-base)' }}>
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="mb-14">
            <p className="section-label mb-3">Experience</p>
            {/* "Work" slides up */}
            <div className="overflow-hidden">
              <div className="exp-first text-3xl md:text-5xl font-display font-black text-white">
                {'Work'.split(' ').map((w, i) => (
                  <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', marginRight: '0.3em' }}>
                    <span className="w-inner" style={{ display: 'inline-block' }}>{w}</span>
                  </span>
                ))}
              </div>
            </div>
            {/* "History" fades in */}
            <div className="exp-second text-3xl md:text-5xl font-display font-black gradient-text">
              History
            </div>
          </div>

          <div className="relative space-y-8 pl-8">
            <div className="absolute left-0 top-2 bottom-0 w-px"
              style={{ background: 'linear-gradient(to bottom, var(--primary), transparent)' }} />
            {experience.map((item, i) => (
              <div key={i} className="exp-entry relative" style={{ opacity: 0 }}>
                <div className="absolute -left-8 top-5 w-4 h-4 rounded-full border-2"
                  style={{
                    background:  item.current ? 'var(--primary)' : 'var(--bg-card)',
                    borderColor: 'var(--primary)',
                    boxShadow:   item.current ? '0 0 14px rgba(139,92,246,0.7)' : '0 0 10px rgba(139,92,246,0.3)',
                  }} />
                <div className="glass-card rounded-2xl p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <div>
                      <h3 className="text-lg font-display font-black text-white">{item.title}</h3>
                      <p className="font-bold gradient-text text-sm">{item.company}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="tag text-xs">{item.year}</span>
                      {item.current && <span className="tag-gold text-xs">Current</span>}
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed mt-3" style={{ color: 'var(--text-secondary)' }}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="hr-line hr-gradient" style={{ transform: 'scaleX(0)' }} />

      {/*
       * ── TOOLS — only icon + name, NO % bars (those live on Skills page)
       * Different display: large glowing icon cards in a row
       */}
      <section ref={toolsRef} className="py-20 relative overflow-hidden" style={{ background: '#0a0a14' }}>
        <div className="pointer-events-none absolute inset-0">
          <div className="orb-purple w-96 h-96 bottom-0 right-0 opacity-15" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="mb-12">
            <p className="section-label mb-3">Software</p>
            <h2 className="text-3xl md:text-4xl font-display font-black text-white">Tools I Work With</h2>
          </div>

          {/* Large icon row — no % levels */}
          <div className="flex flex-wrap gap-5 justify-start">
            {toolSkills.map((skill) => (
              <div
                key={skill.name}
                className="tool-icon flex flex-col items-center gap-3 group cursor-default"
                style={{ opacity: 0 }}
              >
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center p-4 relative transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: skill.bg || 'rgba(139,92,246,0.1)',
                    border:     `1px solid rgba(255,255,255,0.1)`,
                    boxShadow: skill.whiteGlow
                      ? '0 0 14px 2px rgba(255,255,255,0.20)'
                      : `0 0 12px 1px ${skill.color}28`,
                    transition: 'box-shadow 0.4s ease, transform 0.3s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.boxShadow = skill.whiteGlow
                      ? '0 0 28px 5px rgba(255,255,255,0.35)'
                      : `0 0 28px 4px ${skill.color}55`
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = skill.whiteGlow
                      ? '0 0 14px 2px rgba(255,255,255,0.20)'
                      : `0 0 12px 1px ${skill.color}28`
                  }}
                >
                  {/* Breathing glow behind the icon */}
                  <div className="icon-glow" style={{ '--glow-color': skill.whiteGlow ? 'rgba(255,255,255,0.5)' : `${skill.color}99` }} />
                  <img src={skill.icon} alt={skill.name} className="w-full h-full object-contain relative" style={{ zIndex: 1 }}
                    onError={e => {
                      e.target.style.display = 'none'
                      e.target.parentNode.innerHTML = `<span style="font-size:1.8rem;font-weight:900;color:${skill.color};position:relative;z-index:1">${skill.name.slice(0,2)}</span>`
                    }} />
                </div>
                <p className="text-xs font-semibold text-white text-center">{skill.name}</p>
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: skill.color, boxShadow: `0 0 6px ${skill.color}` }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="hr-line hr-gradient" style={{ transform: 'scaleX(0)' }} />

      {/* ── CONTACT ─────────────────────────────────────────────────── */}
      <section className="contact-section py-20" style={{ background: 'var(--bg-base)' }}>
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <p className="section-label mb-3">Contact</p>
          <h2 className="text-3xl md:text-5xl font-display font-black text-white mb-10">Find Me Here</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="contact-item glass-card rounded-2xl p-6 text-center" style={{ opacity: 0 }}>
              <FiPhone className="w-6 h-6 mx-auto mb-3" style={{ color: 'var(--primary-light)' }} />
              <p className="text-xs section-label mb-1">Phone</p>
              <a href={designer.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-white font-semibold text-sm hover:text-primary-300 transition-colors">{designer.phone}</a>
            </div>
            <div className="contact-item glass-card rounded-2xl p-6 text-center" style={{ opacity: 0 }}>
              <FiMail className="w-6 h-6 mx-auto mb-3" style={{ color: 'var(--accent-light)' }} />
              <p className="text-xs section-label mb-1">Email</p>
              <a href={`mailto:${designer.email}`} className="text-white font-semibold text-sm hover:text-accent-300 transition-colors break-all">{designer.email}</a>
            </div>
            <div className="contact-item glass-card rounded-2xl p-6 text-center" style={{ opacity: 0 }}>
              <FaBehance className="w-6 h-6 mx-auto mb-3" style={{ color: 'var(--primary-light)' }} />
              <p className="text-xs section-label mb-1">Behance</p>
              <a href={designer.social.behance} target="_blank" rel="noopener noreferrer"
                className="text-white font-semibold text-sm hover:text-primary-300 transition-colors">behance.net/piyushdas9</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
