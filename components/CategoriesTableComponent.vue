<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const categories = ref<any[]>([]);
const router = useRouter();

const getCategories = () => {
  $fetch("http://localhost:8000/api/blog/categories").then((response: any) => {
    console.log(response);

    categories.value = response;
  });
};

const deleteCategory = async (categoryId: number) => {
  await $fetch(`http://localhost:8000/api/blog/categories/${categoryId}`, {
    method: "DELETE",
  });
};

getCategories();

const items = (category: any) => [
  [
    {
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => router.push("/categories/edit/" + category.id),
    },
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
      click: async () => {
        await deleteCategory(category.id);
        getCategories();
      },
    },
  ],
];
</script>

<template>
  <div v-if="!!categories.length" class="p-5 mx-auto">
    <a :href="'/'">
      <button class="text-white py-1 px-6 bg-blue-400 rounded">
        Back to posts
      </button>
    </a>
    <div class="flex justify-center">
      <div class="w-full">
        <div class="card mt-2">
          <div class="card-body flex flex-col items-center">
            <a :href="'/categories/new'"
              ><button class="text-white py-1 px-6 bg-blue-400 rounded">
                Create category
              </button></a
            >
            <table class="table mt-5 table-auto">
              <thead>
                <tr>
                  <th class="p-2">Назва</th>

                  <th class="p-2">Назва батьківської категорії</th>

                  <th class="p-2">Дії</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="category in categories">
                  <td class="p-2">{{ category.title }}</td>

                  <td class="p-2">
                    {{
                      category.parent_category?.title ?? "No parent category"
                    }}
                  </td>

                  <td class="p-2">
                    <UDropdown :items="items(category)">
                      <UButton
                        color="gray"
                        variant="ghost"
                        icon="i-heroicons-ellipsis-horizontal-20-solid"
                      />
                    </UDropdown>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
