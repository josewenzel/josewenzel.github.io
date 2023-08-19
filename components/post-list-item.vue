<template>
  <div class="post-list-item">
    <nuxt-link class="post-list-item_title" :to="post._path">{{
      post.title
    }}</nuxt-link>
    <p class="post-list-item_date">
      {{
        new Date(post.date).toLocaleString("default", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      }}
    </p>
  </div>
</template>

<script>
export default {
  name: "post-list-item",
  props: {
    post: {},
  },
};
</script>

<style scoped>
.post-list-item {
  display: flex;
  width: 100%;
}

.post-list-item_title {
  font-family: "Open Sans", serif;
  margin: auto 0;
  font-weight: bold;
  text-decoration: none;
  color: #212121;
}

.post-list-item_date {
  font-family: "Spectral", sans-serif;
  margin-left: auto;
}

.post-list-item_title:hover {
  color: #626262;
}
</style>
