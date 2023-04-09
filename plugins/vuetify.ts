import { createVuetify } from 'vuetify'
import "vuetify/styles";
import "assets/overrides.css"
export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    ssr: true
  })

  nuxtApp.vueApp.use(vuetify)
})