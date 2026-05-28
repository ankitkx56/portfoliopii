import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaBehance, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { designer } from '../data/portfolio'

const marqueeItems = [
  'Design Ritual', '✦', 'Graphic Designer', '✦',
  'Branding', '✦', 'Social Media', '✦',
  'Print & Packaging', '✦', 'Posters', '✦', 'Motion', '✦',
  'Design Ritual', '✦', 'Graphic Designer', '✦',
  'Branding', '✦', 'Social Media', '✦',
  'Print & Packaging', '✦', 'Posters', '✦', 'Motion', '✦',
]

const socialLinks = [
  { icon: FaBehance,   href: designer.social.behance,   label: 'Behance'   },
  { icon: FaInstagram, href: designer.social.instagram, label: 'Instagram' },
  { icon: FaLinkedin,  href: designer.social.linkedin,  label: 'LinkedIn'  },
]

const footerLinks = [
  { label: 'Home',    path: '/'        },
  { label: 'About',   path: '/about'   },
  { label: 'Work',    path: '/work'    },
  { label: 'Skills',  path: '/skills'  },
  { label: 'Contact', path: '/contact' },
]

const Footer = () => (
  <footer
    className="relative overflow-hidden"
    style={{ background: '#060b14', borderTop: '1px solid var(--bg-border)' }}
  >
    {/* Glow orbs */}
    <div className="pointer-events-none absolute inset-0">
      <div className="orb-purple w-96 h-96 -bottom-32 -left-32 opacity-20" />
      <div className="orb-gold w-64 h-64 top-10 right-10 opacity-10" />
    </div>

    {/* Marquee strip */}
    <div className="marquee-wrapper py-4 border-b" style={{ borderColor: 'var(--bg-border)' }}>
      <div className="marquee-inner">
        {marqueeItems.map((item, i) => (
          <span
            key={i}
            className="mx-6 text-sm font-display font-medium"
            style={{ color: item === '✦' ? 'var(--accent)' : 'var(--text-muted)' }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>

    {/* Main content */}
    <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

        {/* Brand */}
        <div>
          <Link to="/" className="flex items-center gap-2 mb-4 w-fit">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #8b5cf6, #f59e0b)' }}
            >
              <span className="text-white font-bold text-sm">✦</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display font-black text-white text-base">Piyush Das</span>
              <span className="text-xs gradient-text font-semibold">Design Ritual</span>
            </div>
          </Link>
          <p className="text-sm leading-relaxed mb-4 max-w-xs" style={{ color: 'var(--text-secondary)' }}>
            {designer.bioShort}
          </p>
          <div className="tag w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block mr-2 animate-pulse" />
            Open to work
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="section-label mb-5">Pages</h4>
          <ul className="space-y-3">
            {footerLinks.map(link => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="text-sm link-underline transition-colors duration-200 hover:text-white"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="section-label mb-5">Find Me Online</h4>
          <div className="flex gap-3">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 flex items-center justify-center rounded-full glass-card transition-all duration-300 hover:border-primary-500"
              >
                <Icon className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
              </motion.a>
            ))}
          </div>
          <p className="text-xs mt-4" style={{ color: 'var(--text-muted)' }}>
            Instagram: <a href={designer.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">design.ritual</a>
          </p>
        </div>
      </div>

      {/* Bottom */}
      <div
        className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t text-xs"
        style={{ borderColor: 'var(--bg-border)', color: 'var(--text-muted)' }}
      >
        <p>© {new Date().getFullYear()} Design Ritual. All rights reserved.</p>
        <p className="font-mono"><span style={{ color: 'var(--accent)' }}>✦</span> Designed with passion</p>
      </div>
    </div>
  </footer>
)

export default Footer
