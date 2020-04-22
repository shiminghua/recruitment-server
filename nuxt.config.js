const pkg = require('./package.json');

module.exports = {
  mode: 'universal',

  // headers of the page
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
    ],
    link: [
      { rel: 'icon', type: 'image/x-iconn', href: '/favicon.ico' }
    ]
  },

  // customize the progress-bar color
  loading: { color: '#fff' },

  // global css
  css: [
    '~/assets/main.css',
    'element-ui/lib/theme-chalk/index.css',
  ],

  // plugins to load before mounting the app
  plugins: [
    '@/plugins/element-ui',
  ],

  // nuxt.js modules
  modules: [],

  // build conguration
  build: {
    // you can extend webpack config here
    extend(config, ctx) {
      // run eslint on save 
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }
    }
  }
};
