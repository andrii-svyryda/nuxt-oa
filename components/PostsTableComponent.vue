<script setup lang="ts">
const posts = ref<any[]>([]);
const router = useRouter();

const getPosts = () => {
  $fetch("http://localhost:8000/api/blog/posts").then((response: any) => {
    console.log(response);

    posts.value = response;
  });
};

const deletePost = async (postId: number) => {
  await $fetch(`http://localhost:8000/api/blog/posts/${postId}`, {
    method: "DELETE",
  });
};

getPosts();

const items = (post: any) => [
  [
    {
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => router.push("/posts/edit/" + post.id),
    },
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
      click: async () => {
        await deletePost(post.id);
        getPosts();
      },
    },
  ],
];
</script>

<template>
  <div v-if="!!posts.length" class="p-5 mx-auto">
    <div class="flex justify-center">
      <div class="w-full">
        <div class="card mt-2">
          <div class="card-body flex flex-col items-center">
            <div class="flex">
              <a :href="'/posts/new'">
                <button class="text-white py-1 px-6 bg-blue-400 rounded">
                  Create post
                </button>
              </a>
              <a :href="'/categories'">
                <button class="text-white ml-3 py-1 px-6 bg-blue-400 rounded">
                  Categories
                </button>
              </a>
            </div>
            <table class="table mt-5 table-auto">
              <thead>
                <tr>
                  <th class="p-2">Автор</th>

                  <th class="p-2">Заголовок</th>

                  <th class="p-2">Категорія</th>

                  <th class="p-2">Дата публікації</th>

                  <th class="p-2">Дії</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="post in posts">
                  <td class="p-2">{{ post.user.name }}</td>

                  <td class="p-2">
                    <a :href="'/posts/' + post.id">{{ post.title }}</a>
                  </td>

                  <td class="p-2">{{ post.category.title }}</td>

                  <td class="p-2">{{ post.published_at }}</td>

                  <td class="p-2">
                    <UDropdown :items="items(post)">
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
