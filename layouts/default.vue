<template>
    <div class="page-wrapper">
        <Header />
        <div class="content-wrapper">
            <slot />
        </div>
    </div>
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
.page-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 20px;
}

.content-wrapper {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
}

@media screen and (min-width: 1200px) {
    .page-wrapper {
        padding: 0 400px;
        /* Large screens: set padding to 400px */
    }
}

@media screen and (max-width: 768px) {
    .page-wrapper {
        padding: 0 10px;
        /* Small screens: set padding to 10px */
    }
}</style>