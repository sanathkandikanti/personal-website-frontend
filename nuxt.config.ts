import vuetify from 'vite-plugin-vuetify'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@nuxtjs/google-fonts',
        async (options, nuxt) => {
            nuxt.hooks.hook('vite:extendConfig', config => config.plugins.push(
              vuetify({
                  styles: {
                    configFile: 'assets/settings.scss'
                  }
              })
            ))
          }
    ],
    css: [
      'vuetify/styles',
        '@mdi/font/css/materialdesignicons.min.css'
    ],
    build: {
        transpile: ['vuetify'],
      },
      typescript: {shim: false},
      googleFonts: {
        families: {
          Caveat: [400, 500, 600, 700, 800]
        },
        download: false,
        useStylesheet: true
      }
})