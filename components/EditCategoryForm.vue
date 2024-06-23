<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const category = ref({
  title: "",
  content: "",
});
const errors = ref([]);

const fetchCategory = async () => {
  try {
    const data = await $fetch(
      `http://localhost:8000/api/blog/categories/${route.params.id}`
    );
    category.value = data;
  } catch (error) {
    console.error(error);
  }
};

const saveCategory = async () => {
  try {
    await $fetch(
      `http://localhost:8000/api/blog/categories/${route.params.id}`,
      {
        method: "PUT",
        body: category.value,
      }
    );
    router.push("/");
  } catch (error) {
    console.error(error);
  }
};

const { categories, fetchCategories } = useCategories();

onMounted(() => {
  fetchCategory();
  fetchCategories();
});
</script>

<template>
  <div class="p-12">
    <a :href="'/categories'">
      <button class="text-white py-1 px-6 bg-blue-400 rounded">
        Back to categories
      </button>
    </a>
    <div v-if="!!errors.length">
      <div v-for="error in errors">
        <span class="text-red-800">
          {{ error }}
        </span>
      </div>
    </div>
    <h1 class="my-2 text-xl">Edit Category</h1>
    <form @submit.prevent="saveCategory">
      <div class="mb-3 flex items-center">
        <label class="w-32 block" for="title">Title:</label>
        <input
          class="border w-64"
          type="text"
          v-model="category.title"
          id="title"
          required
        />
      </div>
      <div class="mb-3 flex items-center">
        <label class="w-32 block" for="slug">Slug:</label>
        <input
          class="border w-64"
          type="text"
          v-model="category.slug"
          id="slug"
          required
        />
      </div>
      <div class="mb-3 flex items-center">
        <label class="w-32 block" for="description">Description:</label>
        <textarea
          class="border w-64"
          v-model="category.description"
          id="description"
          required
        ></textarea>
      </div>
      <div class="mb-3 flex items-center" v-if="!pending">
        <label class="w-32 block" for="parent_category">Parent category:</label>
        <select
          class="border w-64"
          v-model="category.parent_id"
          id="parent_category"
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
      <button
        type="submit"
        class="text-white my-3 py-1 px-6 bg-blue-400 rounded"
      >
        Save
      </button>
    </form>
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>
