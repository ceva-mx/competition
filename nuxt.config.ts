export default defineNuxtConfig({
  devtools: {
    enabled: true,
  },

  modules: [
    '@nuxtjs/supabase',
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@invictus.codes/nuxt-vuetify',
    '@nuxtjs/google-fonts',
  ],

  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: ['/*'],
    },
  },

  i18n: {
    locales: ['en', 'fr'],
    strategy: 'prefix',
    defaultLocale: 'en',
    vueI18n: "./i18n.config.ts",
  },

  vuetify: {
    moduleOptions: {
      treeshaking: true,
    },
  },
  googleFonts: {
    families: {
      Roboto: [400, 500],
    },
  },
});
