<template>
  <div class="p-5 mx-auto">
    <div class="flex justify-center">
      <div class="w-full">
        <div class="card mt-2">
          <div class="card-body flex flex-col items-center">
            <a :href="'/posts/create'"
              ><button class="text-white py-2 px-6 bg-blue-400 rounded">
                Create post
              </button></a
            >
            <table class="table mt-5 table-auto">
              <thead>
                <tr>
                  <th class="p-2">Автор</th>

                  <th class="p-2">Заголовок</th>

                  <th class="p-2">Категорія</th>

                  <th class="p-2">Дата публікації</th>
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
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const posts = ref<any[]>([]);

const getPosts = () => {
  $fetch("http://localhost:8000/api/blog/posts").then((response: any) => {
    console.log(response);

    posts.value = response;
  });
};

getPosts();
</script>
