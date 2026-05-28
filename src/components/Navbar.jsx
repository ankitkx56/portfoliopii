import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { designer } from '../data/portfolio'

const navLinks = [
  { path: '/',        label: 'Home'    },
  { path: '/about',   label: 'About'   },
  { path: '/work',    label: 'Work'    },
  { path: '/skills',  label: 'Skills'  },
  { path: '/contact', label: 'Contact' },
]

const Navbar = () => {
  const [isScrolled,        setIsScrolled]        = useState(false)
  const [isMobileMenuOpen,  setIsMobileMenuOpen]  = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setIsMobileMenuOpen(false) }, [location.pathname])

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0,    opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled ? 'navbar-scrolled' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link to="/" className="group flex items-center gap-2">
            <motion.div
              className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center bg-[#060b14] border border-white/10"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              <img src="/logo.png" alt="Design Ritual Logo" className="w-full h-full object-cover" />
            </motion.div>
            <div className="flex flex-col leading-none">
              <span className="text-sm font-display font-black text-white">Piyush Das</span>
              <span className="text-xs gradient-text font-semibold">Design Ritual</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative text-sm font-medium transition-colors duration-300 group"
                  style={{ color: isActive ? 'var(--primary-light)' : 'var(--text-secondary)' }}
                >
                  {link.label}
                  {isActive ? (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-px"
                      style={{ background: 'linear-gradient(90deg, var(--primary), var(--accent))' }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  ) : (
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary-400 group-hover:w-full transition-all duration-300" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-4">
            <a
              href={designer.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex btn-primary text-sm py-2.5 px-6"
            >
              Download CV
              <span className="text-accent-300">↓</span>
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(o => !o)}
              className="md:hidden relative w-8 h-8 flex flex-col justify-center gap-1.5 z-50"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <motion.span
                animate={isMobileMenuOpen
                  ? { rotate: 45, y: 7, backgroundColor: 'var(--primary-light)' }
                  : { rotate: 0, y: 0, backgroundColor: 'var(--text-primary)' }}
                className="w-full h-0.5 rounded-full block origin-center transition-colors"
              />
              <motion.span
                animate={isMobileMenuOpen
                  ? { opacity: 0, x: -8 }
                  : { opacity: 1, x: 0 }}
                className="w-5 h-0.5 rounded-full block"
                style={{ backgroundColor: 'var(--text-primary)' }}
              />
              <motion.span
                animate={isMobileMenuOpen
                  ? { rotate: -45, y: -7, backgroundColor: 'var(--primary-light)' }
                  : { rotate: 0, y: 0, backgroundColor: 'var(--text-primary)' }}
                className="w-full h-0.5 rounded-full block origin-center transition-colors"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden"
            style={{ background: 'rgba(6,11,20,0.97)', borderTop: '1px solid var(--bg-border)' }}
          >
            <div className="px-6 py-8 space-y-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Link
                    to={link.path}
                    className="flex items-center justify-between py-3 text-xl font-display font-medium border-b transition-colors duration-200"
                    style={{
                      color: location.pathname === link.path ? 'var(--primary-light)' : 'var(--text-primary)',
                      borderColor: 'var(--bg-border)',
                    }}
                  >
                    {link.label}
                    <span className="text-xs text-dark-500 font-mono">0{i + 1}</span>
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="pt-4"
              >
                <a
                  href={designer.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full text-center text-sm"
                >
                  Download CV ↓
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Navbar
