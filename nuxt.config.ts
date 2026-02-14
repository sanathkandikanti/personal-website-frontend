// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: '@nuxt-themes/alpine',
  modules: [
    '@nuxt/content',
  ],
  typescript: { shim: false },
  
  // Static site generation for AWS Amplify
  ssr: true,
  nitro: {
    preset: 'aws-amplify'
  }
});
