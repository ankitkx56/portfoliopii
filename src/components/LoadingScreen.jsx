import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      setTimeout(onComplete, 600)
    }, 1800)

    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); return 100 }
        return p + Math.random() * 15
      })
    }, 80)

    return () => { clearTimeout(timer); clearInterval(interval) }
  }, [onComplete])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
        >
          {/* Background glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="orb-purple w-96 h-96 -top-20 -left-20 opacity-30" />
            <div className="orb-gold w-64 h-64 bottom-10 right-10 opacity-20" />
          </div>

          {/* Logo */}
          <motion.div
            className="relative z-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="text-4xl md:text-5xl font-display font-bold mb-1"
              initial={{ letterSpacing: '0.5em', opacity: 0 }}
              animate={{ letterSpacing: '0.05em', opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-white">Piyush </span>
              <span className="gradient-text">Das</span>
            </motion.div>
            <motion.p
              className="text-sm font-semibold mb-1 gradient-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Design Ritual
            </motion.p>

            <motion.p
              className="section-label mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Graphic Designer · Portfolio 2026
            </motion.p>

            {/* Progress Bar */}
            <div className="loading-bar-track mx-auto">
              <motion.div
                className="loading-bar-fill"
                initial={{ width: '0%' }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <motion.p
              className="text-xs text-dark-500 mt-3 font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {Math.round(Math.min(progress, 100))}%
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LoadingScreen
