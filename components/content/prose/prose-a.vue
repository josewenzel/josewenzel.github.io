<script setup lang="ts">
defineProps({
  href: {
    type: String,
    default: ''
  },
  target: {
    type: String,
    default: "_blank",
    required: false
  }
})
</script>

<template>
  <NuxtLink :href="href" :target="target">
    <slot />
  </NuxtLink>
</template>

<style scoped>
  a {
    color: #757575;
  }

  a:hover {
    color: #9f9f9f;
  }
</style>