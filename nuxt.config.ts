import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

export default defineNuxtConfig({
  build: {
    transpile: ['vuetify'],
  },

  devtools: {
    enabled: true,
  },

  modules: [
    '@nuxtjs/supabase',
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/google-fonts',
    '@nuxtjs/eslint-module',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],

  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },

  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: [
        '/competition/my',
      ],
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

  eslint: {
    
  },
});
