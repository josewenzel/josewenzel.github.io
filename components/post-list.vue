<template>
  <div class="post-list">
    <content-list :query="query" v-slot="{ list }">
      <div v-for="post in list" :key="post._path" class="post-list_item-row">
        <post-list-item :post="post" />
      </div>
    </content-list>
  </div>
</template>

<script setup>
import PostListItem from "~/components/post-list-item.vue";

const query = { path: "/posts", sort: [{ date: -1 }] };
</script>

<style scoped>
.post-list {
  width: 50%;
  margin-top: 3rem;
  margin-left: auto;
  margin-right: auto;
}

.post-list_item-row {
  width: 100%;
  padding-top: 1.5rem;
}

.post-list_item-row:first-child {
  padding-top: 0px;
}
</style>
