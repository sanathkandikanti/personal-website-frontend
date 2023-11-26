<template>
    <v-container fluid>

        <v-row justify="center">

            <v-col cols="12" sm="10" md="8" lg="6">
                <Header />
                <slot />
            </v-col>
        </v-row>
    </v-container>
</template>
  
  
<script>
import Header from '~/components/header.vue';

export default {
    components: {
        Header,
    },
};
</script>
  
<style>
/* tests */
</style>