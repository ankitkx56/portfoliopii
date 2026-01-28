import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const skills = [
  { name: 'Adobe Photoshop', level: 95, icon: '🎨' },
  { name: 'Adobe Illustrator', level: 90, icon: '✏️' },
  { name: 'Figma', level: 92, icon: '💻' },
  { name: 'Adobe After Effects', level: 85, icon: '🎬' },
  { name: 'Adobe InDesign', level: 88, icon: '📄' },
  { name: 'Sketch', level: 80, icon: '🖌️' },
  { name: 'Blender', level: 75, icon: '🎭' },
  { name: 'Principle', level: 82, icon: '⚡' },
]

const Skills = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    // Animate skill bars
    const skillBars = gsap.utils.toArray('.skill-bar')
    
    skillBars.forEach((bar) => {
      const widthValue = parseInt(bar.dataset.width) || 0
      const parentCard = bar.closest('.skill-card')
      
      // Set initial width to 0
      gsap.set(bar, { width: '0%' })
      
      // Animate to target width
      gsap.to(bar, {
        width: `${widthValue}%`,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: parentCard || bar,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
          once: true,
        },
      })
    })

    // Animate circular progress
    const circularProgress = gsap.utils.toArray('.circular-progress')
    
    circularProgress.forEach((circle) => {
      const percentage = parseInt(circle.dataset.percentage) || 0
      const circumference = 2 * Math.PI * 45 // radius = 45
      const offset = circumference - (percentage / 100) * circumference

      // Set initial state
      gsap.set(circle, { strokeDashoffset: circumference })

      // Animate to target
      gsap.to(circle, {
        strokeDashoffset: offset,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: circle.closest('.text-center') || circle,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
          once: true,
        },
      })
    })

    return () => {
      // Cleanup ScrollTriggers
      ScrollTrigger.getAll().forEach((trigger) => {
        trigger.kill()
      })
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
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
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-dark-50 to-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
              My <span className="gradient-text">Skills</span>
            </h1>
            <p className="text-xl text-dark-600 leading-relaxed">
              A comprehensive toolkit of design software and creative skills honed through years
              of professional experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Skills Grid */}
      <section ref={sectionRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="skill-card p-8 rounded-2xl bg-dark-50 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{skill.icon}</span>
                    <h3 className="text-xl font-display font-bold">{skill.name}</h3>
                  </div>
                  <span className="text-2xl font-bold text-primary-600">{skill.level}%</span>
                </div>
                <div className="relative h-3 bg-dark-200 rounded-full overflow-hidden">
                  <div
                    className="skill-bar absolute top-0 left-0 h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
                    data-width={skill.level}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Circular Progress Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { label: 'Branding', value: 95 },
              { label: 'UI/UX Design', value: 90 },
              { label: 'Motion Graphics', value: 85 },
              { label: 'Print Design', value: 88 },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <svg className="transform -rotate-90 w-32 h-32">
                    <circle
                      cx="50%"
                      cy="50%"
                      r="45"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      className="circular-progress"
                      cx="50%"
                      cy="50%"
                      r="45"
                      stroke="url(#gradient)"
                      strokeWidth="8"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 45}`}
                      data-percentage={item.value}
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#0ea5e9" />
                        <stop offset="100%" stopColor="#38bdf8" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-display font-bold text-primary-600">
                      {item.value}%
                    </span>
                  </div>
                </div>
                <h4 className="text-lg font-semibold text-dark-900">{item.label}</h4>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Additional Skills */}
      <section className="py-20 bg-dark-900 text-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Additional Expertise
            </h2>
            <p className="text-dark-400 text-lg">
              Beyond software proficiency, I bring strategic thinking and creative problem-solving
              to every project.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              'Typography',
              'Color Theory',
              'Layout Design',
              'Visual Storytelling',
              'Brand Strategy',
              'User Research',
              'Prototyping',
              'Design Systems',
            ].map((skill, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center p-6 bg-dark-800 rounded-xl hover:bg-dark-700 transition-colors"
              >
                <div className="text-2xl mb-2">✨</div>
                <div className="font-semibold">{skill}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Skills

