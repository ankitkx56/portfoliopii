// ─── Piyush Das — Design Ritual — Real Data from Portfolio Image ─────────
// Source: Behance gallery / About Me section from portfolio image
// ALL info extracted directly from the provided about me screenshot

export const designer = {
  name:     'Piyush Das',
  brand:    'Design Ritual',
  handle:   '@design.ritual',
  title:    'Graphic Designer',
  bio:      `I'm Piyush Das, a passionate graphic designer who loves transforming ideas into visually engaging designs that connect with people and leave a lasting impression.`,
  bioShort: `Transforming ideas into bold, memorable designs that connect and inspire.`,
  location: 'India',
  available: true,

  // Real contact from image
  phone:    '+91 85957 18809',
  email:    'designritual01@gmail.com',

  // CV download link
  cvUrl:    'https://drive.google.com/file/d/1mF7gyxYkZ_5e9N8JfVyFZpnTsfQH5fFu/view?usp=drivesdk',

  // WhatsApp click-to-chat (strip spaces and leading +)
  whatsappUrl: 'https://wa.me/918595718809',

  social: {
    behance:   'https://www.behance.net/piyushdas9',
    instagram: 'https://instagram.com/design.ritual',
    linkedin:  'https://www.linkedin.com/in/piyush-das-595327300',
  },
}

// ─── Real Experience from image ──────────────────────────────────────────
export const experience = [
  {
    year:        '2024',
    title:       'Graphic Designer',
    company:     'MAKIJAS',
    description: 'Designed social media campaigns and real estate brand visuals.',
  },
  {
    year:        '2024–2025',
    title:       'Graphic Designer',
    company:     'GANNON NORTON',
    description: 'Creating marketing content and visual designs for digital platforms.',
  },
  {
    year:        '2024–2025',
    title:       'Graphic Designer',
    company:     'KAMNA TECHNO',
    description: 'Creating marketing content and visual designs for digital platforms, along with print design projects such as canopy banners and branding materials.',
    current:     true,
  },
]

// ─── ONLY these 6 skills — exactly as shown in the image ─────────────────
export const toolSkills = [
  {
    name:     'Photoshop',
    level:    90,
    icon:     "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 240'%3E%3Crect width='240' height='240' rx='42' fill='%23001E36'/%3E%3Ctext x='120' y='175' font-family='Arial' font-size='120' font-weight='900' fill='%2331A8FF' text-anchor='middle'%3EPs%3C/text%3E%3C/svg%3E",
    color:    '#31A8FF',
    bg:       'rgba(255,255,255,0.07)',
    whiteGlow: true,   // Ps devicon has its own dark bg — use white glow so it stands out
  },
  {
    name:     'Illustrator',
    level:    85,
    icon:     "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 240'%3E%3Crect width='240' height='240' rx='42' fill='%23330000'/%3E%3Ctext x='120' y='175' font-family='Arial' font-size='120' font-weight='900' fill='%23FF9A00' text-anchor='middle'%3EAi%3C/text%3E%3C/svg%3E",
    color:    '#FF9A00',
    bg:       'rgba(255,255,255,0.07)',
    whiteGlow: true,   // Ai devicon has its own dark bg — use white glow
  },
  {
    name:  'CorelDraw',
    level: 80,
    icon:  'https://cdn.simpleicons.org/coreldraw/59B730',
    color: '#59B730',
    bg:    'rgba(255,255,255,0.07)',
  },
  {
    name:  'InDesign',
    level: 78,
    // Adobe-style letter mark SVG — dark maroon bg + "Id" in pink (matches real CC icon)
    icon:  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 240'%3E%3Crect width='240' height='240' rx='38' fill='%2349021F'/%3E%3Ctext x='120' y='188' font-family='Arial' font-size='128' font-weight='900' fill='%23FF3695' text-anchor='middle'%3EId%3C/text%3E%3C/svg%3E",
    color: '#FF3695',
    bg:    'rgba(255,255,255,0.07)',
  },
  {
    name:  'Lightroom',
    level: 75,
    // Adobe-style letter mark SVG — dark blue bg + "Lr" in light blue (matches real CC icon)
    icon:  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 240'%3E%3Crect width='240' height='240' rx='38' fill='%23001D26'/%3E%3Ctext x='120' y='188' font-family='Arial' font-size='128' font-weight='900' fill='%2331A8FF' text-anchor='middle'%3ELr%3C/text%3E%3C/svg%3E",
    color: '#31A8FF',
    bg:    'rgba(255,255,255,0.07)',
  },
  {
    name:     'Figma',
    level:    82,
    icon:     'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
    color:    '#F24E1E',
    bg:       'rgba(255,255,255,0.07)',
    whiteGlow: true,   // Figma icon has its own coloured bg — use white glow
  },
]

// ─── What I Do (Behance description) ─────────────────────────────────────
export const services = [
  {
    icon:  '◆',
    title: 'Branding',
    badge: 'Identity',
    description: 'Logos and visual identity systems that give brands a clear, bold, consistent look.',
    tags: ['Logo Design', 'Brand System', 'Typography'],
  },
  {
    icon:  '◉',
    title: 'Social Media Design',
    badge: 'Digital',
    description: 'Posts, stories, and campaign visuals designed to stop the scroll.',
    tags: ['Posts', 'Stories', 'Campaigns'],
  },
  {
    icon:  '▲',
    title: 'Poster Design',
    badge: 'Print',
    description: 'Bold, expressive posters with strong composition and immediate visual impact.',
    tags: ['Posters', 'Print', 'Digital'],
  },
  {
    icon:  '⬡',
    title: 'Print Materials',
    badge: 'Print',
    description: 'Brochures, canopy banners, and print collateral with clean layouts.',
    tags: ['Brochures', 'Banners', 'Collateral'],
  },
  {
    icon:  '✦',
    title: 'Packaging Design',
    badge: 'Packaging',
    description: 'Product packaging that stands out — bold, functional, and brand-aligned.',
    tags: ['Labels', 'Boxes', 'Product'],
  },
  {
    icon:  '❋',
    title: 'Marketing Content',
    badge: 'Digital',
    description: 'Marketing visuals and content for digital platforms — clean and conversion-focused.',
    tags: ['Marketing', 'Digital', 'Ads'],
  },
]
