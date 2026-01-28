# Premium Graphic Designer Portfolio

A modern, fully animated portfolio website built with React, featuring smooth animations, elegant design, and a premium user experience.

## 🚀 Features

- **Modern Design**: Clean, minimal, and artistic layout with premium aesthetics
- **Smooth Animations**: Powered by Framer Motion and GSAP ScrollTrigger
- **Fully Responsive**: Optimized for all devices and screen sizes
- **Performance Optimized**: Lazy loading, optimized images, and smooth scrolling
- **Custom Cursor**: Interactive cursor effects for enhanced user experience
- **SEO Friendly**: Proper meta tags and semantic HTML structure

## 📦 Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Navigation
- **Framer Motion** - Animation library
- **GSAP + ScrollTrigger** - Advanced scroll animations
- **Tailwind CSS** - Styling
- **Lenis** - Smooth scrolling
- **EmailJS** - Contact form integration

## 🛠️ Installation

1. **Clone or download this repository**

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

## 📝 Customization Guide

### Adding Your Projects

Edit `src/data/projects.js` and update the `projects` array. This centralized file makes it easy to manage all your projects:

```javascript
export const projects = [
  {
    id: 1,
    title: 'Your Project Title',
    category: 'Branding',
    description: 'Project description',
    image: '/images/your-project.jpg', // Use local images in /public/images/
    color: 'from-blue-500 to-cyan-500', // Tailwind gradient classes
    year: '2023',
    client: 'Client Name',
    longDescription: 'Detailed project description...',
    deliverables: ['Item 1', 'Item 2', 'Item 3'],
  },
  // Add more projects...
]
```

**Note:** For local images, place them in the `public/images/` folder and reference them as `/images/filename.jpg`.

### Customizing Content

#### Home Page (`src/pages/Home.jsx`)
- Update hero text and description
- Modify feature cards content
- Change CTA buttons

#### About Page (`src/pages/About.jsx`)
- Update bio text
- Modify stats (projects, clients, etc.)
- Edit timeline/experience section

#### Skills Page (`src/pages/Skills.jsx`)
- Update skills array with your software proficiency
- Modify skill levels (0-100)
- Add or remove skills

#### Contact Page (`src/pages/Contact.jsx`)
- Update contact information (email, phone, location)
- Configure EmailJS (see below)

### Setting Up EmailJS

1. **Create an account** at [EmailJS](https://www.emailjs.com/)

2. **Set up a service** (Gmail, Outlook, etc.)

3. **Create an email template** with variables:
   - `{{from_name}}`
   - `{{from_email}}`
   - `{{message}}`

4. **Get your credentials:**
   - Service ID
   - Template ID
   - Public Key

5. **Update `src/pages/Contact.jsx`:**
   ```javascript
   const result = await emailjs.send(
     'YOUR_SERVICE_ID',      // Replace
     'YOUR_TEMPLATE_ID',     // Replace
     {
       from_name: formData.name,
       from_email: formData.email,
       message: formData.message,
     },
     'YOUR_PUBLIC_KEY'       // Replace
   )
   ```

### Changing Colors

Edit `tailwind.config.js` to customize the color palette:

```javascript
colors: {
  primary: {
    // Your primary colors
  },
  dark: {
    // Your dark/neutral colors
  }
}
```

### Updating Social Links

Edit `src/components/Footer.jsx` and update the `socialLinks` array with your social media profiles.

### Changing Fonts

The project uses Google Fonts (Inter and Poppins). To change fonts:

1. Update the font imports in `index.html`
2. Modify `fontFamily` in `tailwind.config.js`

## 🎨 Design Customization

### Animations

- **Framer Motion**: Used for page transitions and component animations
- **GSAP ScrollTrigger**: Used for scroll-based animations
- Adjust animation durations and easing in individual components

### Layout

- All pages use a max-width container (`max-w-7xl`)
- Spacing is consistent using Tailwind's spacing scale
- Responsive breakpoints: `sm:`, `md:`, `lg:`

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navbar.jsx      # Navigation bar
│   ├── Footer.jsx      # Footer with social links
│   └── CustomCursor.jsx # Custom cursor effect
├── pages/              # Page components
│   ├── Home.jsx        # Home page
│   ├── About.jsx       # About page
│   ├── Work.jsx        # Projects gallery
│   ├── ProjectDetail.jsx # Individual project page
│   ├── Skills.jsx      # Skills page
│   └── Contact.jsx     # Contact form
├── App.jsx             # Main app component with routing
├── main.jsx            # Entry point
└── index.css           # Global styles
```

## 🚢 Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready to deploy to any static hosting service.

## 📄 License

This project is open source and available for personal and commercial use.

## 🤝 Support

For questions or issues, please open an issue on the repository or contact the developer.

---

**Built with ❤️ for creative professionals**

