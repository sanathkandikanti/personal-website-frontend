<template>
    <header class="header">
        <v-container>
            <v-row align="center">
                <v-col cols="6" class="no-padding">
                    <nav>
                        <ul class="menu-items">
                            <li><nuxt-link to="/" exact>About</nuxt-link></li>
                            <li><nuxt-link to="/note">Notes</nuxt-link></li>
                            <li><nuxt-link to="/contact">Contact</nuxt-link></li>
                        </ul>
                    </nav>
                </v-col>
                <v-col cols="6" class="text-right no-padding">
                    <span class="header-text"><nuxt-link to="/">Sanath</nuxt-link></span>
                </v-col>
            </v-row>
        </v-container>
    </header>
</template>
  
<style scoped>
/* Additional class to remove padding */
.no-padding {
    padding: 0 !important;
}

.menu-items {
    display: flex;
    list-style: none;
    padding: 0;
    padding-left: 0;
}

.menu-items li {
    margin-right: 20px;
}

.menu-items li:last-child {
    margin-right: 0;
}

nav ul li a {
    text-decoration: none;
    color: #333333;
    font-weight: 500;
    transition: color 0.3s, border-bottom 0.3s;
    font-size: 1.25rem;
    position: relative;
}

/* Underline effect */
nav ul li a::after {
    content: '';
    display: block;
    position: absolute;
    bottom: -2px;
    width: 0;
    height: 1px;
    background-color: transparent;
    transition: width 0.3s ease, background-color 0.3s ease;
}

/* Animate underline on hover */
nav ul li a:hover::after {
    width: 100%;
    background-color: black;
}

/* Animate underline on hover for selected link */
nav ul li .router-link-exact-active:hover::after {
    width: 100%;
    background-color: #1ad6ff;
}

/* Active/Selected link without underline */
.router-link-exact-active::after {
    width: 0;
    background-color: transparent;
}

/* Selected link text color */
.router-link-exact-active {
    color: #1ad6ff;
}

.header {
    padding-top: 4rem;
    padding-bottom: 4rem;
}

.header-text {
    text-decoration: none;
    color: #333333;
    font-weight: bold;
    font-size: 2.5rem;
}

.header-text a {
    color: #333333;
    text-decoration: none;
}

.text-right {
    text-align: right;
}
</style>
  