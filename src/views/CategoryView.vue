<script setup>
import { onMounted, ref } from "vue";
import { useStockStore } from "../stores/stockStore.js";
import CategoryCreateModal from "../components/CategoryCreateModal.vue";

const stockStore = useStockStore();

const isModalOpen = ref(false);

onMounted(() => {
  stockStore.fetchData();
});
</script>
<template>
  <div class="p-6">
    <div class="flex justify-between">
      <h1 class="text-3xl font-bold mb-4 text-slate-600">
        Category Management
      </h1>
      <div v-if="stockStore.loading" class="text-slate-500">Memuat Data...</div>
      <div
        v-else-if="stockStore.error"
        class="text-red-500 bg-red-50 p-4 rounded-lg"
      >
        {{ stockStore.error }}
      </div>
      <button
        v-on:click="isModalOpen = true"
        class="bg-slate-800 hover:bg-slate-700 text-white font-medium py-2 px-4 rounded-lg text-sm transition mb-4"
      >
        Add Category
      </button>
    </div>
    <CategoryCreateModal :is-open="isModalOpen" @close="isModalOpen = false" />
    <div
      class="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-lg border border-default"
    >
      <table class="w-full text-sm text-left rtl:text-right text-body">
        <thead
          class="text-sm text-body bg-slate-800 border-b rounded-base border-default"
        >
          <tr>
            <th scope="col" class="px-6 py-3 font-medium text-white">#</th>
            <td scope="col" class="px-6 py-3 font-medium text-white">
              CATEGORY NAME
            </td>
            <td scope="col" class="px-6 py-3 font-medium text-white">
              DESCRIPTION
            </td>
            <td scope="col" class="px-6 py-3 font-medium text-white">ACTION</td>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(category, index) in stockStore.categories"
            :key="category.id"
            class="bg-slate-200 border-b border-default"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium text-heading whitespace-nowrap"
            >
              {{ index + 1 }}
            </th>
            <td class="px-6 py-4">{{ category.name }}</td>
            <td class="px-6 py-4">{{ category.description }}</td>
            <td class="px-6 py-4"></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
