<template>
  <div class="post-container">
    <content-doc :path="$route._path" v-slot="{ doc }">
      <div class="post-tags">
        <div class="post-tags_item" v-for="tag in doc.tags">
<!--          <nuxt-link :to="`../tags/${tag}`">{{ tag }}</nuxt-link>-->
          <nuxt-link :to="`#`">{{ tag }}</nuxt-link>
        </div>
      </div>
      <h1 class="post-title">{{ doc.title }}</h1>
      <p class="post-date">
        {{
          new Date(doc.date).toLocaleString("default", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })
        }}
      </p>
      <content-renderer :value="doc" />
    </content-doc>
  </div>
</template>

<style scoped>
.post-container {
  margin: 0 auto;
  width: 60%;
}

.post-tags {
  display: flex;
}

.post-tags_item {
  display: flex;
  background-color: #f5f5f5;
  margin-left: 0.5rem;
  padding: 0.2rem 1rem;
  border-radius: 2rem;
}

.post-tags_item a {
  text-decoration: none;
}

.post-tags_item:first-child {
  display: flex;
  margin-left: 0;
}

.post-tags_item a {
  color: #212121;
}

.post-tags_item a:hover {
  color: #626262;
}

.post-title {
  margin-bottom: -0.5rem;
}

.post-date {
  margin: auto 0;
  font-family: "Spectral", sans-serif;
}
</style>
