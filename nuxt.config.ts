// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/supabase', '@nuxtjs/tailwindcss'],
  supabase: {
    url: process.env.NUXT_PUBLIC_SUPABASE_URL,
    key: process.env.NUXT_PUBLIC_SUPABASE_KEY,
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: ['/', '/about'],
    },
  },
  tailwindcss: {
    config: {
      plugins: [require('daisyui')],
      daisyui: {
        themes: [
          {
            cyberpunk: {
              primary: '#ff4ecd',
              secondary: '#4354ff',
              accent: '#00fbff',
              neutral: '#2e2c35',
              'base-100': '#0c090d',
              'base-content': '#eaf0f6',
              info: '#66c6ff',
              success: '#18ff8d',
              warning: '#ffb302',
              error: '#ff3f5f',
            },
          },
        ],
      },
    },
  },
  app: {
    head: {
      title: 'Blur Vault - Cyberpunk Face Blurring',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: 'Cyberpunk-themed face blurring application',
        },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
      script: [
        // Add the GitHub Pages SPA redirect script
        {
          innerHTML: `
          // This script handles GitHub Pages SPA routing
          (function() {
            if (window.location.search.includes('?/')) {
              var path = window.location.search.substring(2);
              var cleanPath = path.split('&')[0];
              window.history.replaceState(null, null, '/' + cleanPath);
            }
          })();
        `,
          type: 'text/javascript',
        },
      ],
    },
    // Set the base URL for GitHub Pages deployment
    // This should match your repository name
    // For example, if your repo is username/blur-vault, use '/blur-vault/'
    baseURL: process.env.NODE_ENV === 'production' ? '/CursorDemo/' : '/',
  },
  // Generate static files for GitHub Pages
  nitro: {
    preset: 'github-pages',
  },
})
