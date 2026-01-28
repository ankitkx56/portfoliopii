import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { getProjectById } from '../data/projects'

const ProjectDetail = () => {
  const { id } = useParams()
  const project = getProjectById(id)
  
  if (!project) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <Link to="/work" className="text-primary-600 hover:underline">
            Back to Work
          </Link>
        </div>
      </div>
    )
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Image */}
      <section className="relative h-[60vh] overflow-hidden">
                    <motion.img
                      src={project.image.replace('w=800&h=600', 'w=1200&h=800')}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 1.2, ease: 'easeOut' }}
                    />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-12">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="inline-block px-4 py-2 bg-primary-600 text-white rounded-full text-sm font-semibold mb-4">
                {project.category}
              </span>
              <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-4">
                {project.title}
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-display font-bold mb-4">Project Overview</h2>
                <p className="text-lg text-dark-600 leading-relaxed mb-6">
                  {project.description}
                </p>
                <p className="text-lg text-dark-600 leading-relaxed">
                  {project.longDescription}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-2xl font-display font-bold mb-4">Deliverables</h3>
                <ul className="space-y-2">
                  {project.deliverables.map((item, index) => (
                    <li key={index} className="flex items-center text-dark-600">
                      <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="sticky top-24 space-y-6 p-8 bg-dark-50 rounded-2xl"
              >
                <div>
                  <div className="text-sm text-dark-500 mb-1">Client</div>
                  <div className="text-lg font-semibold">{project.client}</div>
                </div>
                <div>
                  <div className="text-sm text-dark-500 mb-1">Year</div>
                  <div className="text-lg font-semibold">{project.year}</div>
                </div>
                <div>
                  <div className="text-sm text-dark-500 mb-1">Category</div>
                  <div className="text-lg font-semibold">{project.category}</div>
                </div>
                <Link
                  to="/work"
                  className="block w-full text-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-full hover:bg-primary-700 transition-colors"
                >
                  Back to Work
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProjectDetail

