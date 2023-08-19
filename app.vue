<template>
  <div class="page-container">
    <the-header />
    <nuxt-page class="content-wrap" />
    <the-footer />
  </div>
</template>

<style scoped>
* {
  font-family: "Spectral", sans-serif;
}

.page-container {
  position: relative;
  min-height: 100vh;
}

.content-wrap {
  padding-bottom: 5rem;
}
</style>
