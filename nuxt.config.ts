// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    [
      '@nuxtjs/tailwindcss',
      {
        cssPath: '~/assets/css/tailwind.css', // Path file Tailwind CSS
        configPath: 'tailwind.config.js',     // Path file konfigurasi Tailwind
      }
    ]
  ],
  css: ['~/assets/css/tailwind.css'],
})
