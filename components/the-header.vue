<template>
  <header>
    <div class="header-container">
      <nuxt-link to="/" class="title">Experimental Typer</nuxt-link>
      <nav class="main-nav">
        <ul class="main-nav_list">
          <li class="main-nav_list-item">
            <nuxt-link class="main-nav_link" to="/">About</nuxt-link>
          </li>
          <li class="main-nav_list-item">
            <nuxt-link class="main-nav_link" to="/">Github</nuxt-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
* {
  font-family: "Open Sans", serif;
}

.title {
  font-family: Megrim, serif;
  font-size: 1.5rem !important;
  text-decoration: none;
  color: #212121;
}

header {
  top: 0;
  width: 100%;
  height: 5rem;
}

.header-container {
  display: flex;
  height: 100%;
  padding: 0 2rem;
  margin: 0 auto;
  flex-wrap: nowrap;
}

.title {
  display: flex;
  font-size: 1.25rem;
  line-height: 1.75rem;
  align-items: center;
  height: 100%;
}

.main-nav {
  margin-left: auto;
  height: 100%;
}

.main-nav_list {
  display: flex;
  list-style-type: none;
  height: 100%;
  margin: 0 auto;
}

.main-nav_list-item {
  margin-left: 2.25rem;
  height: 100%;
}

.main-nav_list-item:first-child {
  margin-left: 0;
}

.main-nav_link {
  display: flex;
  align-items: center;
  margin: 0;
  height: 100%;
  text-decoration: none;
  font-weight: bold;
  color: #212121;
}

.main-nav_link:hover {
  color: #626262;
}
</style>