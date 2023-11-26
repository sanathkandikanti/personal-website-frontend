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
  padding: 20px 0;
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
    font-weight: bold;
    padding: 10px 15px;
    transition: background-color 0.3s ease;
  }
  
  .router-link-exact-active {
    color: #1ad6ff;
  }
  
  .header-text {
    text-decoration: none;
    color: #333333;
    font-weight: bold;
    font-size: 48px;
  }
  
  .header-text a {
    color: #333333;
    text-decoration: none;
  }
  </style>
  