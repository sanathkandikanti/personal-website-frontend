<template>
    <header class="header">
        <div class="header-content">
            <nav>
                <ul>
                    <li><nuxt-link to="/" exact>About</nuxt-link></li>
                    <li><nuxt-link to="/notes">Notes</nuxt-link></li>
                    <li><nuxt-link to="/contact">Contact</nuxt-link></li>
                </ul>
            </nav>
            <span class="header-text"><nuxt-link to="/">Sanath</nuxt-link></span>
        </div>
    </header>
</template>
  
<style scoped>
.header {
    background-color: #ffffff;
    padding-top: 4rem;
    padding-bottom: 4rem;
    width: 100%;
    margin: 0 auto;
}

.header-content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
}

@media screen and (max-width: 768px) {

    /* Adjust max-width for smaller screens */
    .header-content {
        max-width: 90%;
    }
}


nav ul {
    list-style: none;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0;
    margin: 0;
}

nav ul li {
    margin-right: 20px;
}

nav ul li:last-child {
    margin-right: 0;
}

nav ul li a {
  text-decoration: none;
  color: #333333;
  font-weight: 500;
  padding: 10px 15px;
  transition: color 0.3s, border-bottom 0.3s; /* Added transition for underline effect */
  font-size: 1.25rem; /* Adjust font size */
  position: relative; /* Create space for the underline */
}

/* Underline effect */
nav ul li a::after {
  content: '';
  display: block;
  position: absolute;
  bottom: -2px;
  width: 0;
  height: 1px;
  background-color: #000; /* Black underline for unselected elements */
  transition: width 0.3s ease, background-color 0.3s ease; /* Added transition for underline color */
}

/* Animate underline on hover */
nav ul li a:hover::after {
  width: 100%;
  background-color: black; /* Change underline color on hover */
}

/* Active/Selected link without underline */
.router-link-exact-active::after {
  width: 0; /* Hide underline after selection */
  background-color: transparent; /* No underline for selected link */
}

/* Selected link text color */
.router-link-exact-active {
  color: #1ad6ff; /* Change text color for selected link */
}



.router-link-exact-active {
    color: #1ad6ff;
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
</style>
  