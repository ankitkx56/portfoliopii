import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Lenis from 'lenis'
import Navbar         from './components/Navbar'
import Footer         from './components/Footer'
import CustomCursor   from './components/CustomCursor'
import ScrollToTop    from './components/ScrollToTop'
import LoadingScreen  from './components/LoadingScreen'
import Home           from './pages/Home'
import About          from './pages/About'
import Work           from './pages/Work'
import Skills         from './pages/Skills'
import Contact        from './pages/Contact'
import ProjectDetail  from './pages/ProjectDetail'

// Page transition wrapper
const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
)

// Inner app with location access
const AppInner = () => {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"         element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/about"    element={<PageWrapper><About /></PageWrapper>} />
        <Route path="/work"     element={<PageWrapper><Work /></PageWrapper>} />
        <Route path="/work/:id" element={<PageWrapper><ProjectDetail /></PageWrapper>} />
        <Route path="/skills"   element={<PageWrapper><Skills /></PageWrapper>} />
        <Route path="/contact"  element={<PageWrapper><Contact /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    // Smooth scroll with Lenis
    const lenis = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    // Expose globally so ScrollToTop can call lenis.scrollTo(0) on route change
    window.__lenis = lenis

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // Prevent browser scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    return () => {
      lenis.destroy()
      window.__lenis = null
    }
  }, [])

  return (
    <Router>
      <div className="App" style={{ background: 'var(--bg-base)' }}>
        <CustomCursor />
        <ScrollToTop />

        {/* Loading Screen */}
        <AnimatePresence>
          {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
        </AnimatePresence>

        {/* Main App */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: loaded ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        >
          <Navbar />
          <main>
            <AppInner />
          </main>
          <Footer />
        </motion.div>
      </div>
    </Router>
  )
}

export default App
