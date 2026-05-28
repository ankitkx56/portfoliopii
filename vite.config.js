import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  server: {
    port: 3000,
    open: true,
  },

  build: {
    // Warn on chunks > 600 kB (default is 500)
    chunkSizeWarningLimit: 600,

    rollupOptions: {
      output: {
        /**
         * Manual chunk splitting — keeps vendor bundles separate so
         * the browser can cache them independently of app code.
         *
         * Chunks:
         *   react-vendor   → react + react-dom + react-router-dom
         *   motion-vendor  → framer-motion
         *   gsap-vendor    → gsap (includes ScrollTrigger)
         *   icons-vendor   → react-icons
         */
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-router') || id.includes('react-dom') || id.includes('react/')) {
              return 'react-vendor'
            }
            if (id.includes('framer-motion')) {
              return 'motion-vendor'
            }
            if (id.includes('gsap')) {
              return 'gsap-vendor'
            }
            if (id.includes('react-icons')) {
              return 'icons-vendor'
            }
          }
        },
      },
    },

    // Minify with esbuild (default, fastest)
    minify: 'esbuild',

    // Output source maps only in dev (not in production builds)
    sourcemap: false,

    // Asset inlining threshold — inline images < 4 kB as base64
    assetsInlineLimit: 4096,
  },
})
