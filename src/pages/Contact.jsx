import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { designer } from '../data/portfolio'
import { FiSend, FiPhone, FiMail } from 'react-icons/fi'
import { FaBehance, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { scrollTA } from '../hooks/useHeroAnimation'
import emailjs from '@emailjs/browser'

gsap.registerPlugin(ScrollTrigger)

const socialLinks = [
  { icon: FaBehance,   href: designer.social.behance,   label: 'Behance',   username: 'behance.net/piyushdas9', color: 'var(--primary-light)' },
  { icon: FaInstagram, href: designer.social.instagram, label: 'Instagram', username: '@design.ritual',         color: 'var(--accent-light)'  },
  { icon: FaLinkedin,  href: designer.social.linkedin,  label: 'LinkedIn',  username: 'Piyush Das',             color: 'var(--primary-light)' },
]

const Contact = () => {
  const pageRef = useRef(null)
  const [formData, setFormData]       = useState({ name: '', email: '', subject: '', message: '' })
  const [isSubmitting, setSubmitting] = useState(false)
  const [status, setStatus]           = useState(null)

  const handleChange = (e) => setFormData(d => ({ ...d, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setStatus(null)

    // Load environment variables
    const web3Key = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY
    const emailjsService = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const emailjsTemplate = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const emailjsKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    // 1. Web3Forms Submission (Easiest setup)
    if (web3Key) {
      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: web3Key,
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
          }),
        });

        const res = await response.json();
        if (res.success) {
          setStatus('success')
          setFormData({ name: '', email: '', subject: '', message: '' })
        } else {
          setStatus('error')
        }
      } catch (err) {
        console.error("Web3Forms submission failed:", err)
        setStatus('error')
      } finally {
        setSubmitting(false)
        setTimeout(() => setStatus(null), 6000)
      }
      return
    }

    // 2. EmailJS Submission
    if (emailjsService && emailjsTemplate && emailjsKey) {
      try {
        const res = await emailjs.send(
          emailjsService,
          emailjsTemplate,
          {
            from_name: formData.name,
            reply_to: formData.email,
            subject: formData.subject,
            message: formData.message,
          },
          emailjsKey
        );
        if (res.status === 200) {
          setStatus('success')
          setFormData({ name: '', email: '', subject: '', message: '' })
        } else {
          setStatus('error')
        }
      } catch (err) {
        console.error("EmailJS submission failed:", err)
        setStatus('error')
      } finally {
        setSubmitting(false)
        setTimeout(() => setStatus(null), 6000)
      }
      return
    }

    // 3. Mock Fallback (For local dev preview)
    console.warn("No contact form configuration found. To receive actual emails, create a .env file with your Web3Forms or EmailJS credentials.")
    setTimeout(() => {
      setStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      setSubmitting(false)
      setTimeout(() => setStatus(null), 6000)
    }, 1200)
  }

  // Set initial hidden state BEFORE paint to prevent flash
  useLayoutEffect(() => {
    const infoCards = pageRef.current?.querySelectorAll('.info-card')
    if (infoCards?.length) gsap.set(infoCards, { x: -60, opacity: 0 })
    const formEl = pageRef.current?.querySelector('.contact-form-wrap')
    if (formEl) gsap.set(formEl, { y: 50, opacity: 0 })
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── HERO — no ScrollTrigger ─────────────────────────────────── */
      // "Get In" — slides up word by word
      const firstWords = pageRef.current?.querySelectorAll('.first-line .w-inner')
      if (firstWords?.length) {
        gsap.fromTo(firstWords,
          { y: '115%', skewX: 8 },
          { y: 0, skewX: 0, stagger: 0.07, duration: 1.1, ease: 'expo.out', delay: 0.1, clearProps: 'all' }
        )
      }

      // "Touch" — fades in
      const secondLine = pageRef.current?.querySelector('.second-line')
      if (secondLine) {
        gsap.set(secondLine, { opacity: 0, y: 60, scale: 0.93 })
        gsap.to(secondLine,
          { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: 'expo.out', delay: 0.55 }
        )
      }

      gsap.fromTo('.contact-sub',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out', delay: 1.2, clearProps: 'all' }
      )

      /* ── INFO CARDS: once:true — no glitchy reversal ─────────── */
      const infoCards = pageRef.current?.querySelectorAll('.info-card')
      if (infoCards?.length) {
        gsap.to(infoCards, {
          x: 0, opacity: 1, stagger: 0.12, duration: 0.9, ease: 'expo.out',
          scrollTrigger: { trigger: infoCards[0], start: 'top bottom', once: true },
        })
      }

      /* ── FORM: once:true — no glitchy reversal ───────────────── */
      const formEl = pageRef.current?.querySelector('.contact-form-wrap')
      if (formEl) {
        gsap.to(formEl, {
          y: 0, opacity: 1, duration: 1.0, ease: 'expo.out',
          scrollTrigger: { trigger: formEl, start: 'top bottom', once: true },
        })
      }

      /* ── HR LINES ────────────────────────────────────────────────── */
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
          <div className="orb-purple w-[500px] h-[500px] top-0 left-1/2 -translate-x-1/2 opacity-20" />
          <div className="absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: 'linear-gradient(rgba(139,92,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <p className="section-label mb-4">Let's Connect</p>

          {/* "Get In" — slides up */}
          <div className="overflow-hidden">
            <div className="first-line text-5xl md:text-7xl lg:text-8xl font-display font-black text-white">
              {'Get In'.split(' ').map((word, i) => (
                <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', marginRight: '0.3em' }}>
                  <span className="w-inner" style={{ display: 'inline-block' }}>{word}</span>
                </span>
              ))}
            </div>
          </div>

          {/* "Touch" — gsap.set handles initial hide */}
          <div
            className="second-line text-5xl md:text-7xl lg:text-8xl font-display font-black gradient-text"
          >
            Touch
          </div>

          <p className="contact-sub mt-5 text-base md:text-lg max-w-xl mx-auto" style={{ color: 'var(--text-secondary)', opacity: 0 }}>
            Message me directly, or reach out through any of the platforms below.
          </p>
        </div>
      </section>

      <hr className="hr-line hr-gradient" style={{ transform: 'scaleX(0)' }} />

      {/* ── CONTACT SECTION ─────────────────────────────────────────── */}
      <section className="py-8 pb-24" style={{ background: '#0a0a14' }}>
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

            {/* Left: Info */}
            <div className="lg:col-span-2 space-y-5">
              <div>
                <h2 className="text-2xl font-display font-black text-white mb-1">Contact Info</h2>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>All real details — reach out anytime.</p>
              </div>

              <a href={designer.whatsappUrl} target="_blank" rel="noopener noreferrer" className="info-card flex items-center gap-4 p-4 rounded-xl glass-card-hover">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(37,211,102,0.12)', border: '1px solid rgba(37,211,102,0.3)' }}>
                  <FiPhone className="w-4 h-4" style={{ color: '#25D366' }} />
                </div>
                <div>
                  <p className="text-xs section-label">WhatsApp</p>
                  <p className="text-white font-semibold text-sm">{designer.phone}</p>
                </div>
              </a>

              <a href={`mailto:${designer.email}`} className="info-card flex items-center gap-4 p-4 rounded-xl glass-card-hover">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.2)' }}>
                  <FiMail className="w-4 h-4" style={{ color: 'var(--accent-light)' }} />
                </div>
                <div>
                  <p className="text-xs section-label">Email</p>
                  <p className="text-white font-semibold text-sm">{designer.email}</p>
                </div>
              </a>

              {socialLinks.map(({ icon: Icon, href, label, username, color }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="info-card flex items-center gap-4 p-4 rounded-xl glass-card-hover">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.2)' }}>
                    <Icon className="w-4 h-4" style={{ color }} />
                  </div>
                  <div>
                    <p className="text-xs section-label">{label}</p>
                    <p className="text-white font-semibold text-sm">{username}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-3">
              <div className="contact-form-wrap glass-card rounded-3xl p-8 md:p-10">
                <h3 className="text-xl font-display font-black text-white mb-2">Send a Message</h3>
                <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>For projects, collabs, or just to say hello.</p>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="form-field">
                      <input type="text" id="name" name="name" value={formData.name} onChange={handleChange}
                        required placeholder=" " className="form-input" />
                      <label htmlFor="name" className="form-label">Your Name</label>
                    </div>
                    <div className="form-field">
                      <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}
                        required placeholder=" " className="form-input" />
                      <label htmlFor="email" className="form-label">Your Email</label>
                    </div>
                  </div>
                  <div className="form-field">
                    <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange}
                      required placeholder=" " className="form-input" />
                    <label htmlFor="subject" className="form-label">Subject</label>
                  </div>
                  <div className="form-field">
                    <textarea id="message" name="message" value={formData.message} onChange={handleChange}
                      required rows={6} placeholder=" " className="form-input resize-none" />
                    <label htmlFor="message" className="form-label">Message</label>
                  </div>
                  <motion.button type="submit" disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="btn-primary w-full py-4 text-base disabled:opacity-50">
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full block" />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Send Message <FiSend className="w-4 h-4" />
                      </span>
                    )}
                  </motion.button>
                  <AnimatePresence>
                    {status === 'success' && (
                      <motion.div key="ok" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="p-4 rounded-xl text-sm font-medium"
                        style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.25)', color: '#4ade80' }}>
                        ✓ Message sent! I'll get back to you soon.
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
