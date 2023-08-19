<template>
  <footer>
    <div class="footer-container">
      <nav class="footer-nav">
        <ul>
          <li class="footer-nav_item">
            <nuxt-link to="/" class="footer-nav_item-text"
              >© Jose Wenzel {{ new Date().getFullYear() }}</nuxt-link
            >
          </li>
          <li class="footer-nav_item">
            <nuxt-link class="footer-nav_item-text" to="/">About</nuxt-link>
          </li>
          <li class="footer-nav_item">
            <nuxt-link class="footer-nav_item-text" to="/">Github</nuxt-link>
          </li>
        </ul>
      </nav>
    </div>
  </footer>
</template>

<style scoped>
* {
  font-family: "Open Sans", serif;
}

footer {
  position: absolute;
  padding-top: 5rem;
  width: 100%;
  height: 5rem;
}

.footer-container {
  display: flex;
  padding: 0 2rem;
  margin: 0 auto;
  flex-wrap: nowrap;
  width: 50%;
  height: 100%;
}

.footer-nav {
  margin: 0 auto;
  height: 100%;
}

.footer-nav ul {
  display: flex;
  height: 100%;
  list-style: none;
}

.footer-nav_item {
  margin-left: 2.25rem;
  height: 100%;
}

.footer-nav_item:first-child {
  margin-left: 0;
}

.footer-nav_item-text {
  display: flex;
  padding-top: 0.625rem;
  padding-bottom: 0.625rem;
  align-items: center;
  text-decoration: none;
  color: #212121;
}

.footer-nav_item-text:hover {
  color: #626262;
}
</style>