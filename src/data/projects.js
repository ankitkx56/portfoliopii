// ─── Design Ritual — Projects ────────────────────────────────────────────
// Based on the Behance portfolio:
// "Showcasing diverse design projects including social media posts, branding,
//  posters, print materials, and packaging. Highlights work for diamond tooling,
//  real estate, plant-based juice, clothing, and Kurkure, focusing on bold
//  visuals, clean layouts, and creative design."

export const projects = [
  {
    id: 1,
    title: 'Diamond Tooling — Brand Identity',
    category: 'Branding',
    tags: ['Logo', 'Brand System', 'Industrial'],
    description: 'Brand identity for a diamond tooling brand — bold, precise, and built for impact.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&q=80',
    year: '2024',
    featured: true,
    longDescription: 'A brand identity project for a diamond tooling brand, focused on communicating precision, strength, and quality. The visual system uses bold geometric forms, a strong color palette, and typography that works across both industrial labels and digital presence.',
    deliverables: ['Logo Design', 'Brand Colors', 'Typography', 'Brand Assets'],
  },
  {
    id: 2,
    title: 'Real Estate — Social Media Posts',
    category: 'Social Media',
    tags: ['Social Media', 'Real Estate', 'Posts'],
    description: 'Social media post designs for a real estate brand — clean layouts, bold typography, premium feel.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop&q=80',
    year: '2024',
    featured: true,
    longDescription: 'Social media design work for a real estate brand. Each post was designed with clean, professional layouts and bold typographic hierarchy — conveying trust and premium quality to potential buyers on Instagram and other platforms.',
    deliverables: ['Instagram Posts', 'Story Templates', 'Social Creatives'],
  },
  {
    id: 3,
    title: 'Plant-Based Juice — Packaging',
    category: 'Packaging',
    tags: ['Packaging', 'Label', 'FMCG'],
    description: 'Packaging design for a plant-based juice brand — fresh, bold, and designed to stand out.',
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=800&h=600&fit=crop&q=80',
    year: '2024',
    featured: false,
    longDescription: 'Packaging and label design for a plant-based juice product. The design focuses on communicating freshness and natural ingredients through vivid color, organic shapes, and clean typography — built to stand out in retail environments.',
    deliverables: ['Label Design', 'Packaging Layout', 'Color System'],
  },
  {
    id: 4,
    title: 'Clothing Brand — Social Media',
    category: 'Social Media',
    tags: ['Fashion', 'Social Media', 'Clothing'],
    description: 'Social media designs for a clothing brand — edgy visuals, strong layouts, youth-focused.',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&h=600&fit=crop&q=80',
    year: '2024',
    featured: false,
    longDescription: 'Social media design work for a contemporary clothing brand. The visual approach uses high-contrast layouts, bold type, and expressive styling to connect with a young, fashion-forward audience.',
    deliverables: ['Social Posts', 'Story Templates', 'Campaign Visuals'],
  },
  {
    id: 5,
    title: 'Kurkure — Promotional Posters',
    category: 'Print',
    tags: ['Poster', 'FMCG', 'Print'],
    description: 'Promotional poster designs for Kurkure — high-energy, bold colors, instant visual impact.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop&q=80',
    year: '2023',
    featured: true,
    longDescription: 'Promotional poster series for Kurkure — a high-energy FMCG brand. The designs use bold, expressive layouts with dynamic typography and vivid color to communicate the product\'s playful personality and create immediate shelf impact.',
    deliverables: ['Poster Series', 'Print-Ready Files', 'Digital Adaptations'],
  },
  {
    id: 6,
    title: 'Motion Graphics — Social Reels',
    category: 'Motion',
    tags: ['Motion', 'After Effects', 'Reels'],
    description: 'Animated social media content and motion graphics — created with Adobe After Effects.',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop&q=80',
    year: '2023',
    featured: false,
    longDescription: 'Motion graphics and animated content created for social media platforms. Includes logo animations, kinetic typography, and branded reel transitions — all designed to bring static visual identities to life digitally.',
    deliverables: ['Logo Animation', 'Social Reels', 'Motion Templates'],
  },
]

export const getProjectById = (id) => projects.find((p) => p.id === parseInt(id))
export const getFeaturedProjects = () => projects.filter((p) => p.featured)
export const categories = ['All', 'Branding', 'Social Media', 'Packaging', 'Print', 'Motion']
