<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useCategories } from "~/composables/useCategories";

const category = ref({
  title: "",
  description: "",
  parent_id: 1,
  title: "",
  slug: "",
});

const router = useRouter();
const errors = ref([]);

const saveCategory = async () => {
  try {
    await $fetch("http://localhost:8000/api/blog/categories", {
      method: "POST",
      body: category.value,
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
    <h1 class="my-2 text-xl">Create Category</h1>
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
        Create
      </button>
    </form>
  </div>
</template>

<style scoped></style>
