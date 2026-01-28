import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Home = () => {
  const heroRef = useRef(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    // Parallax effect for background only
    const parallaxTrigger = gsap.to('.hero-bg', {
      yPercent: 50,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })

    return () => {
      // Cleanup ScrollTriggers on unmount
      if (parallaxTrigger?.scrollTrigger) {
        parallaxTrigger.scrollTrigger.kill()
      }
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[80vh] md:min-h-screen pt-20 sm:pt-28 pb-10 sm:pb-16 flex items-center justify-center bg-gradient-to-br from-dark-50 to-white"
      >
        {/* Background Pattern */}
        <div className="hero-bg absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Floating graphic design software logos (around, not behind text) */}
        <div className="pointer-events-none absolute inset-0 z-0 hidden sm:block">
          <motion.img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg"
            alt="Adobe Photoshop"
            className="w-10 md:w-12 drop-shadow-xl absolute"
            style={{ top: '8%', left: '6%' }}
            animate={{ x: [0, 18, -10, 6, 0], y: [0, -16, 4, -8, 0], rotate: [0, 8, -6, 4, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg"
            alt="Adobe Illustrator"
            className="w-10 md:w-12 drop-shadow-xl absolute"
            style={{ top: '16%', right: '4%' }}
            animate={{ x: [0, -16, 10, -6, 0], y: [0, 10, -8, 6, 0], rotate: [0, -7, 4, -3, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          />
          <motion.img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg"
            alt="Figma"
            className="w-9 md:w-11 drop-shadow-xl absolute"
            style={{ bottom: '10%', left: '12%' }}
            animate={{ x: [0, -12, 6, -4, 0], y: [0, 8, -10, 6, 0], rotate: [0, 5, -5, 3, 0] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          />
          <motion.img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gimp/gimp-original.svg"
            alt="GIMP"
            className="w-9 md:w-11 drop-shadow-xl absolute"
            style={{ bottom: '6%', right: '12%' }}
            animate={{ x: [0, 10, -14, 8, 0], y: [0, -10, 8, -6, 0], rotate: [0, -6, 6, -4, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1.1 }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 text-center">
          <motion.span
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white/80 text-[11px] sm:text-xs md:text-sm font-medium text-dark-700 shadow-sm border border-dark-100 mb-5 sm:mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block h-2 w-2 rounded-full bg-primary-500" />
            UI/UX • Brand & Visual Designer
          </motion.span>

          <motion.h1
            className="hero-title text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-bold mb-6 sm:mb-10 leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="block">Creative</span>
            <span className="block gradient-text">Designer</span>
          </motion.h1>
          
          <motion.p
            className="hero-subtitle text-base sm:text-lg md:text-2xl text-dark-600 mb-8 sm:mb-12 max-w-xl sm:max-w-2xl mx-auto px-2 sm:px-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Crafting visual experiences that inspire, engage, and transform ideas into
            compelling design solutions.
          </motion.p>

          <motion.div
            className="flex flex-col items-center gap-6 sm:gap-8 md:gap-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6">
              <Link
                to="/work"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-primary-600 text-white text-sm sm:text-base font-semibold rounded-full hover:bg-primary-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                View My Work
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-6 sm:px-7 py-2.5 sm:py-3 rounded-full border border-dark-200 bg-white/70 text-xs sm:text-sm font-medium text-dark-800 hover:bg-dark-50 transition-all duration-300"
              >
                Let&apos;s Collaborate
              </Link>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-8 text-left md:text-center w-full max-w-md sm:max-w-none">
              <div>
                <p className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-dark-900">
                  3+
                </p>
                <p className="text-[11px] sm:text-xs md:text-sm text-dark-500">
                  Years of experience
                </p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-dark-900">
                  25+
                </p>
                <p className="text-[11px] sm:text-xs md:text-sm text-dark-500">
                  Completed projects
                </p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-dark-900">
                  10+
                </p>
                <p className="text-[11px] sm:text-xs md:text-sm text-dark-500">
                  Happy clients
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section
        ref={sectionRef}
        className="py-16 sm:py-20 md:py-24 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 sm:gap-6 mb-10 sm:mb-14">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-dark-900 mb-2 sm:mb-3">
                What I Do Best
              </h2>
              <p className="text-sm sm:text-base text-dark-600 max-w-xl">
                From bold brand systems to polished digital products, I design experiences
                that feel intentional, memorable, and easy to use.
              </p>
            </div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10"
          >
            {[
              {
                title: 'Brand Identity',
                badge: 'Strategy + Visuals',
                description:
                  'Logo systems, color palettes, and typography that translate your story into a consistent visual language.',
              },
              {
                title: 'Product & UI Design',
                badge: 'Web • App • Dashboard',
                description:
                  'Clean, modern interfaces with clear hierarchy, smooth interactions, and pixel-perfect layouts.',
              },
              {
                title: 'Visual Communication',
                badge: 'Marketing & Social',
                description:
                  'Posters, banners, and social creatives that grab attention and communicate your message instantly.',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="section-item"
              >
                <div className="h-full p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-dark-50 to-white border border-dark-100/60 hover:border-primary-200 hover:shadow-xl transition-all duration-300 flex flex-col gap-3 sm:gap-4">
                  <span className="inline-flex px-3 py-1 rounded-full bg-white text-[10px] sm:text-[11px] font-semibold tracking-wide text-primary-700 border border-primary-100 w-fit">
                    {feature.badge}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-dark-900">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-dark-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process strip */}
      <section className="py-16 sm:py-20 bg-dark-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 sm:gap-8 mb-8 sm:mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-2 sm:mb-3">
                A simple, thoughtful process
              </h2>
              <p className="text-sm sm:text-base text-dark-100 max-w-xl">
                I guide projects from rough ideas to polished visuals with clear steps and communication.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
            {[
              {
                step: '01',
                title: 'Discover',
                text: 'We define goals, audience, and visual direction through a focused conversation.',
              },
              {
                step: '02',
                title: 'Design',
                text: 'I explore concepts, refine layouts, and build a clear visual story for your brand.',
              },
              {
                step: '03',
                title: 'Deliver',
                text: 'You receive ready-to-use assets, guidelines, and support for a smooth launch.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative rounded-2xl border border-white/10 bg-white/5 px-5 sm:px-6 py-6 sm:py-7 backdrop-blur-sm"
              >
                <div className="text-xs font-semibold tracking-[0.2em] uppercase text-primary-200 mb-3">
                  {item.step}
                </div>
                <h3 className="text-xl font-display font-semibold mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-dark-100 leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-28 -mt-px bg-gradient-to-b from-dark-900 via-primary-600 to-primary-500 text-white">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-display font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Let's Create Something Amazing Together
          </motion.h2>
          <motion.p
            className="text-xl mb-8 text-primary-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Ready to bring your vision to life? Let's discuss your next project.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              to="/contact"
              className="inline-block px-8 py-4 bg-white text-primary-600 font-semibold rounded-full hover:bg-primary-50 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Get In Touch
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home

