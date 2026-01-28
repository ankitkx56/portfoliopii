import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const About = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    // Animate stats count-up
    const statNumbers = gsap.utils.toArray('.stat-number')
    
    statNumbers.forEach((stat) => {
      const endValue = parseInt(stat.textContent) || 0
      const obj = { value: 0 }
      
      gsap.to(obj, {
        value: endValue,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: stat.closest('section') || stat,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
          once: true,
        },
        onUpdate: () => {
          stat.textContent = Math.round(obj.value)
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
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
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
              About <span className="gradient-text">Me</span>
            </h1>
            <p className="text-xl text-dark-600 leading-relaxed">
              Passionate about creating designs that tell stories and connect with audiences
              on an emotional level.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary-100 to-primary-200 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-6xl">
                  👨‍🎨
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="text-4xl font-display font-bold">Creative Vision</h2>
              <p className="text-dark-600 leading-relaxed text-lg">
                With over 8 years of experience in graphic design, I've had the privilege of
                working with brands ranging from startups to Fortune 500 companies. My approach
                combines strategic thinking with creative execution, ensuring every design
                serves a purpose and tells a story.
              </p>
              <p className="text-dark-600 leading-relaxed text-lg">
                I specialize in brand identity, digital design, and visual communication.
                My work is driven by a passion for clean aesthetics, meaningful interactions,
                and designs that make a lasting impact.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-dark-900 text-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { number: '150', label: 'Projects Completed' },
              { number: '50', label: 'Happy Clients' },
              { number: '8', label: 'Years Experience' },
              { number: '25', label: 'Awards Won' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center"
              >
                <div className="stat-number text-5xl md:text-6xl font-display font-bold mb-2 text-primary-400">
                  {stat.number}
                </div>
                <div className="text-dark-400 text-sm md:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section ref={sectionRef} className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.h2
            className="text-4xl md:text-5xl font-display font-bold mb-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Experience
          </motion.h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-12"
          >
            {[
              {
                year: '2020 - Present',
                title: 'Senior Graphic Designer',
                company: 'Creative Agency',
                description:
                  'Leading design projects for major clients, developing brand identities, and mentoring junior designers.',
              },
              {
                year: '2017 - 2020',
                title: 'Graphic Designer',
                company: 'Design Studio',
                description:
                  'Created visual designs for digital and print media, collaborated with cross-functional teams.',
              },
              {
                year: '2015 - 2017',
                title: 'Junior Designer',
                company: 'Marketing Agency',
                description:
                  'Assisted in creating marketing materials, learned industry best practices, and developed design skills.',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="timeline-item relative pl-8 border-l-2 border-primary-200"
              >
                <div className="absolute -left-2 top-0 w-4 h-4 bg-primary-600 rounded-full"></div>
                <div className="text-primary-600 font-semibold mb-2">{item.year}</div>
                <h3 className="text-2xl font-display font-bold mb-1">{item.title}</h3>
                <div className="text-primary-600 font-medium mb-3">{item.company}</div>
                <p className="text-dark-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About

