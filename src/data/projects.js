// Project data - easily customizable
// Replace images with your own project images
// Images can be local files in /public/images/ or external URLs

export const projects = [
  {
    id: 1,
    title: 'Brand Identity Design',
    category: 'Branding',
    description: 'Complete brand identity redesign for a tech startup',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
    color: 'from-blue-500 to-cyan-500',
    year: '2023',
    client: 'Tech Startup',
    longDescription:
      'A comprehensive brand identity redesign for a cutting-edge tech startup. The project involved creating a complete visual system including logo, color palette, typography, and brand guidelines.',
    deliverables: ['Logo Design', 'Brand Guidelines', 'Color Palette', 'Typography System', 'Business Cards'],
  },
  {
    id: 2,
    title: 'Digital Campaign',
    category: 'Digital',
    description: 'Social media campaign visuals and animations',
    image: 'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=800&h=600&fit=crop',
    color: 'from-purple-500 to-pink-500',
    year: '2023',
    client: 'Fashion Brand',
    longDescription: 'Created a series of animated visuals for social media that captured the essence of the brand.',
    deliverables: ['Social Media Graphics', 'Animated Posts', 'Campaign Strategy'],
  },
  {
    id: 3,
    title: 'Editorial Design',
    category: 'Print',
    description: 'Magazine layout and typography design',
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&h=600&fit=crop',
    color: 'from-orange-500 to-red-500',
    year: '2022',
    client: 'Publishing House',
    longDescription: 'Designed a complete magazine layout with custom typography and visual hierarchy.',
    deliverables: ['Magazine Layout', 'Typography System', 'Print Design'],
  },
  {
    id: 4,
    title: 'Web Interface Design',
    category: 'UI/UX',
    description: 'Modern and intuitive user interface design',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop',
    color: 'from-green-500 to-emerald-500',
    year: '2023',
    client: 'SaaS Company',
    longDescription: 'Designed a modern web interface with focus on user experience and accessibility.',
    deliverables: ['UI Design', 'Design System', 'Prototypes'],
  },
  {
    id: 5,
    title: 'Packaging Design',
    category: 'Packaging',
    description: 'Sustainable packaging design for eco-friendly products',
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&h=600&fit=crop',
    color: 'from-yellow-500 to-orange-500',
    year: '2022',
    client: 'Eco Brand',
    longDescription: 'Created sustainable packaging solutions that are both functional and environmentally conscious.',
    deliverables: ['Package Design', 'Label Design', 'Branding'],
  },
  {
    id: 6,
    title: 'Motion Graphics',
    category: 'Animation',
    description: 'Animated brand videos and motion graphics',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop',
    color: 'from-indigo-500 to-purple-500',
    year: '2023',
    client: 'Media Company',
    longDescription: 'Produced engaging motion graphics and animated videos for brand promotion.',
    deliverables: ['Motion Graphics', 'Video Production', 'Animation'],
  },
]

// Helper function to get project by ID
export const getProjectById = (id) => {
  return projects.find((project) => project.id === parseInt(id))
}

