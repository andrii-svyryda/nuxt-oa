import { ref } from "vue";

export function useCategories() {
  const categories = ref([]);

  const fetchCategories = async () => {
    try {
      const data = await $fetch(
        "http://localhost:8000/api/blog/categories/combo-box"
      );
      categories.value = data;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    categories,
    fetchCategories,
  };
}
