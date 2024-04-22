<script setup lang="ts">
const columns = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "title",
    label: "Title",
    sortable: true,
  },
  {
    key: "description",
    label: "Description",
    sortable: true,
  },
  {
    key: "price",
    label: "Price",
    sortable: true,
  },
  {
    key: "rating",
    label: "Rating",
    sortable: true,
  },
  {
    key: "brand",
    label: "Brand",
    sortable: true,
  },
  {
    key: "thumbnail",
    label: "Thumbnail",
    sortable: true,
  },
];

const sort = ref({
  column: "name",
  direction: "asc",
});

const page = ref(1);
const pageCount = 5;

const q = ref("");

const { data: productsResponse, pending } = await useAsyncData(
  "productsResponse",
  () =>
    $fetch(`https://dummyjson.com/products/search`, {
      params: {
        q: q.value,
        limit: pageCount,
        skip: (page.value - 1) * pageCount,
        sort: `${sort.value.column}:${sort.value.direction}`,
      },
    }),
  {
    watch: [page, q, sort],
  }
);
</script>

<template>
  <div class="p-6">
    <h1 class="text-center text-xl pb-4">Products list</h1>
    <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
      <UInput v-model="q" placeholder="Filter people..." />
    </div>
    <UTable
      v-model:sort="sort"
      :loading="pending"
      :columns="columns"
      :rows="productsResponse.products"
      sort-mode="manual"
    >
      <template #rating-data="{ row }">
        <span :class="row.rating < 4.5 ? 'text-red-600' : 'text-green-600'">
          {{ row.rating }}
        </span>
      </template>
      <template #thumbnail-data="{ row }">
        <img width="100" height="100" :src="row.thumbnail" />
      </template>
    </UTable>
    <div
      class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700"
    >
      <UPagination
        v-model="page"
        :page-count="pageCount"
        :total="productsResponse.total"
      />
    </div>
  </div>
</template>
;
