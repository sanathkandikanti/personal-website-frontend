<template>
    <div class="container">
        <v-tabs
          v-model="tab"
          :hide-slider="true"
          align-tabs="start"
          selected-class="active-tab"
          bg-color="transparent"
          density="comfortable"
        >
          <v-tab :value="1">About</v-tab>
          <v-tab :value="2">Articles</v-tab>
          <v-tab :value="3">Mystagram</v-tab>
          <v-tab :value="4">Contact</v-tab>
        </v-tabs>
        <v-window v-model="tab">
          <v-window-item
            v-for="n in 3"
            :key="n"
            :value="n"
          >
            <v-container fluid>
              <v-row>
                <v-col
                  v-for="i in 36"
                  :key="i"
                  cols="12"
                  md="4"
                  class="column-container"
                >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic quo quod, exercitationem enim ipsum corporis porro similique beatae vitae quisquam alias, possimus id nesciunt reiciendis expedita assumenda eum molestiae? Nesciunt.
                </v-col>
              </v-row>
            </v-container>
          </v-window-item>
        </v-window>
    </div>
    </template>
    
    <script setup lang="ts">
    
    
      
    useServerSeoMeta({
      title: 'My Amazing Site',
      ogTitle: 'My Amazing Site',
      description: 'This is my amazing site, let me tell you all about it.',
      ogDescription: 'This is my amazing site, let me tell you all about it.',
      ogImage: 'https://example.com/image.png',
      twitterCard: 'summary_large_image',
    })
    </script>
    
    <script lang="ts">
    export default {
        data: () => ({
          tab: null,
        }),
      }
    </script>
    
    <style scoped>
    .v-tab {
      font-weight: 700;
      font-size: 1.25rem;
      text-transform: capitalize !important;
    }
    
    .v-tab > .v-tab:hover {
      background-color: transparent !important;
      background: transparent !important;
    }
    
    .theme--dark.v-tabs-items {
      background-color: transparent !important;
    
    }
    .theme--light.v-tabs-items {
      background-color: transparent !important;
    }
    .active-tab {
      color: #1ad6ff;
    }
    
    .v-ripple__container {
        display:none !important;
    }

    .container {
        padding-top: 5%;
        padding-left: 20%;
        padding-right: 20%;
    }

    .column-container {
        font-size: 18px;
    }
    </style>