<script setup>
import { useAsyncData } from "nuxt/app";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useCategories } from "~/composables/useCategories";

const post = ref({
  title: "",
  content_raw: "",
  published_at: "",
});
const router = useRouter();
const errors = ref([]);

const savePost = async () => {
  try {
    const response = await $fetch("http://localhost:8000/api/blog/posts", {
      method: "POST",
      body: post.value,
    });

    router.push("/");
  } catch (error) {
    console.log(error.response);
    if (error.response._data.errors) {
      errors.value = error.response._data.errors.title;
      console.log(errors.value);
    }
  }
};

const { categories, fetchCategories } = useCategories();

onMounted(fetchCategories);
</script>

<template>
  <div class="p-12">
    <a :href="'/'">
      <button class="text-white py-1 px-6 bg-blue-400 rounded">
        Back to posts
      </button>
    </a>
    <div v-if="!!errors.length">
      <div v-for="error in errors">
        <span class="text-red-800">
          {{ error }}
        </span>
      </div>
    </div>
    <h1 class="my-2 text-xl">Create Post</h1>
    <form @submit.prevent="savePost">
      <div class="mb-3 flex items-center">
        <label class="w-32 block" for="title">Title:</label>
        <input
          class="border w-64"
          type="text"
          v-model="post.title"
          id="title"
          required
        />
      </div>
      <div class="mb-3 flex items-center">
        <label class="w-32 block" for="content_raw">Content:</label>
        <textarea
          class="border w-64"
          v-model="post.content_raw"
          id="content_raw"
          required
        ></textarea>
      </div>
      <div class="mb-3 flex items-center" v-if="!pending">
        <label class="w-32 block" for="category">Category:</label>
        <select
          class="border w-64"
          v-model="post.category_id"
          id="category"
          required
        >
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.id_title }}
          </option>
        </select>
      </div>
      <div class="mb-3 flex items-center">
        <label class="w-32 block" for="publication_date"
          >Publication Date:</label
        >
        <input
          class="border w-64"
          type="datetime-local"
          v-model="post.published_at"
          id="publication_date"
          required
        />
      </div>
      <button
        type="submit"
        class="text-white my-3 py-1 px-6 bg-blue-400 rounded"
      >
        Create
      </button>
    </form>
  </div>
</template>

<style scoped></style>
