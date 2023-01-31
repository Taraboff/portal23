export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Сервер ШЧ-Петропавловск',
    htmlAttrs: {
      lang: 'ru',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['plugins/modal', 'plugins/sysmessage'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/proxy',
  ],
  proxy: {
    '/api': process.env.API_URL,
    // target: 'http://127.0.0.1:1337/',
    // changeOrigin: true,
    // pathRewrite: {
    //   '^/api': '/api',
    // },
    // },
  },

  publicRuntimeConfig: {
    appVersion: '0.9.8 от 31.01.2023 г.',
  },
  privateRuntimeConfig: {
    apiSecret: process.env.API_SECRET,
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    // baseURL: process.env.API_URL, // || 'http://localhost:1337/api',
    proxy: true,
    // prefix: '/api/',
    // credentials: true,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  router: {
    middleware: ['auth'],
  },
  auth: {
    // Options
    strategies: {
      local: {
        token: {
          property: 'jwt',
        },
        user: {
          property: false,
        },
        endpoints: {
          login: {
            url: 'api/auth/local',
            method: 'post',
          },
          user: {
            url: 'api/users/me',
            method: 'get',
          },
          logout: false,
        },
      },
    },
  },
}
