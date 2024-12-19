// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
  ],
  tailwindcss: {
    cssPath: '~/assets/tailwind.css', // Path file Tailwind CSS
    configPath: 'tailwind.config.js',     // Path file konfigurasi Tailwind
  },
  css: ['~/assets/tailwind.css'],
  runtimeConfig: {
    public: {}, // Untuk variabel yang bisa diakses dari frontend
    mongoUrl: process.env.MONGO_URL || '', // Private runtime config
  },
})