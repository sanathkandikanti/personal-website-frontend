<template>
    <header>
        <nav>
            <ul>
                <li><nuxt-link to="/">About</nuxt-link></li>
                <li><nuxt-link to="/notes">Notes</nuxt-link></li>
                <li><nuxt-link to="/contact">Contact</nuxt-link></li>
            </ul>
        </nav>
    </header>
</template>

  
<style scoped>
header {
    padding: 10px 20px;
}

nav ul {
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
}

nav ul li {
    margin-right: 20px;
}

nav ul li a {
    text-decoration: none;
    color: black;
    padding: 10px;
    transition: background-color 0.3s ease;
}

nav ul li a:hover {
    border-radius: 5px;
}
</style>