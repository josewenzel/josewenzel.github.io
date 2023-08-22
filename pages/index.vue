<template>
  <div class="introduction">
    <p>
      Greetings to all! I'm Jose Wenzel, a passionate Software Engineer located
      in Barcelona. With over five years of consultancy experience, I've
      accumulated a wealth of knowledge in engineering practices and technical
      experiments. This website is my platform to share these valuable insights,
      hoping you find inspiration and enjoyment in my content. Let's embark on
      this knowledge-sharing journey together!
    </p>
  </div>
  <post-list />
</template>

<script>
import PostList from "~/components/post-list.vue";

export default {
  name: "index",
  components: { PostList },
};
</script>

<style scoped>
.introduction {
  width: 66.666667%;
  margin: 0 auto;
  padding: 0 2rem;
}

@media (max-width: 1024px) {
  .introduction {
    width: 100%;
  }
}
</style>