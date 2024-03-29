import vuetify from "vite-plugin-vuetify";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  content: {
    dir: 'content'
  },
  modules: [
    async (options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) =>
        config.plugins.push(
          vuetify({
            styles: { configFile: new URL('assets/settings.scss', import.meta.url).pathname }
          })
        )
      );
    },
    '@nuxt/content',
  ],
  css: [
    "@/assets/supreme.css",
    "@mdi/font/css/materialdesignicons.min.css",
  ],
  build: {
    transpile: ["vuetify"],
  },
  typescript: { shim: false }
});
