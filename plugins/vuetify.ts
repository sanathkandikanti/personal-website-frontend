import { createVuetify } from 'vuetify'
import "vuetify/styles";
import "assets/overrides.css"
export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    ssr: false
  })

  nuxtApp.vueApp.use(vuetify)
})