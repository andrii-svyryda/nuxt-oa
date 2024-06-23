<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const post = ref({});

const fetchPost = async () => {
  try {
    const response = await $fetch(
      `http://localhost:8000/api/blog/posts/${route.params.id}`
    );
    post.value = response;
  } catch (error) {
    console.error(error);
  }
};

onMounted(fetchPost);
</script>

<template>
  <div class="p-5" v-if="!!post.title">
    <a :href="'/categories'">
      <button class="text-white py-1 px-6 bg-blue-400 rounded">
        Back to categories
      </button>
    </a>
    <h1 class="text-2xl my-3 font-bold text-center">{{ post.title }}</h1>
    <p>
      Published at <span class="font-bold">{{ post.published_at }}</span>
    </p>
    <p>Category: {{ post.category.title }}</p>
    <p>User: {{ post.user.name }}</p>
    <p class="pt-5">Content:</p>
    <p>{{ post.content_raw }}</p>
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>
