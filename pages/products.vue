<script setup lang="ts">
const columns = [{
  key: 'id',
  label: 'ID'
}, {
  key: 'name',
  label: 'Name',
  sortable: true
}, {
  key: 'title',
  label: 'Title',
  sortable: true
}, {
  key: 'email',
  label: 'Email',
  sortable: true,
  direction: 'desc' as const
}, {
  key: 'role',
  label: 'Role'
}]

const people = [{
  id: 1,
  name: 'Lindsay Walton',
  title: 'Front-end Developer',
  email: 'lindsay.walton@example.com',
  role: 'Member'
}, {
  id: 2,
  name: 'Courtney Henry',
  title: 'Designer',
  email: 'courtney.henry@example.com',
  role: 'Admin'
}, {
  id: 3,
  name: 'Tom Cook',
  title: 'Director of Product',
  email: 'tom.cook@example.com',
  role: 'Member'
}, {
  id: 4,
  name: 'Whitney Francis',
  title: 'Copywriter',
  email: 'whitney.francis@example.com',
  role: 'Admin'
}, {
  id: 5,
  name: 'Leonard Krasner',
  title: 'Senior Designer',
  email: 'leonard.krasner@example.com',
  role: 'Owner'
}, {
  id: 6,
  name: 'Floyd Miles',
  title: 'Principal Designer',
  email: 'floyd.miles@example.com',
  role: 'Member'
}, {
  id: 7,
  name: 'Emily Selman',
  title: 'VP, User Experience',
  email: '',
  role: 'Admin'
}, {
  id: 8,
  name: 'Kristin Watson',
  title: 'VP, Human Resources',
  email: '',
  role: 'Member'
}, {
  id: 9,
  name: 'Emma Watson',
  title: 'Front-end Developer',
  email: '',
  role: 'Member'
}, {
  id: 10,
  name: 'John Doe',
  title: 'Designer',
  email: '',
  role: 'Admin'
}, {
  id: 11,
  name: 'Jane Doe',
  title: 'Director of Product',
  email: '',
  role: 'Member'
}, {
  id: 12,
  name: 'John Smith',
  title: 'Copywriter',
  email: '',
  role: 'Admin'
}, {
  id: 13,
  name: 'Jane Smith',
  title: 'Senior Designer',
  email: '',
  role: 'Owner'
}]

const sort = ref({
  column: 'name',
  direction: 'asc'
})

const page = ref(1)
const pageCount = 5

const pending = false;

const q = ref('')

const rows = computed(() => {
  const compare = (a, b) => {
    const aVal = a[sort.value.column]
    const bVal = b[sort.value.column]

    if (sort.value.direction === "desc")
    {
      return aVal < bVal;
    }

    return aVal > bVal;
  }

  const lowerSearchText = q.value.toLowerCase()

  const filteredPeople = lowerSearchText.length ? people.filter(p => Object.values(p).some(v => String(v).toLowerCase().includes(lowerSearchText))) : people

  const sortedPeople = filteredPeople.sort((a, b) => compare(a, b) ? 1 : -1)

  return sortedPeople.slice((page.value - 1) * pageCount, (page.value) * pageCount)
})

</script>

<template>
  <div class="p-6">
    <h1 class="text-center text-xl pb-4">Products list</h1>
    <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
      <UInput v-model="q" placeholder="Filter people..." />
    </div>
    <UTable v-model:sort="sort" :loading="pending" :columns="columns" :rows="rows" sort-mode="manual" />
    <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
      <UPagination v-model="page" :page-count="pageCount" :total="people.length" />
    </div>
  </div>
</template>;
