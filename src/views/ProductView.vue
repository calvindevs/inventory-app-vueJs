<script setup>
import { computed, onMounted } from "vue";
import { useStockStore } from "../stores/stockStore.js";

const stockStore = useStockStore();
const productWithCategory = computed(() => {
  return stockStore.products.map((product) => {
    const category = stockStore.categories.find((category) => {
      return category.id === product.category_id;
    });

    return {
      ...product,
      category_name: category ? category.name : "Unknown Category",
    };
  });
});
onMounted(() => {
  stockStore.fetchData();
});
</script>
<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-4 text-slate-600">Product Management</h1>
    <div v-if="stockStore.loading" class="text-slate-500">Memuat Data...</div>
    <div
      v-else-if="stockStore.error"
      class="text-red-500 bg-red-50 p-4 rounded-lg"
    >
      {{ stockStore.error }}
    </div>
    <div
      class="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-lg border border-default"
    >
      <table class="w-full text-sm text-left rtl:text-right text-body">
        <thead
          class="text-sm text-body bg-slate-800 border-b rounded-base border-default"
        >
          <tr>
            <th scope="col" class="px-6 py-3 font-medium text-white">#</th>
            <th scope="col" class="px-6 py-3 font-medium text-white">SKU</th>
            <th scope="col" class="px-6 py-3 font-medium text-white">
              PRODUCT NAME
            </th>
            <th scope="col" class="px-6 py-3 font-medium text-white">
              CATEGORY
            </th>
            <th scope="col" class="px-6 py-3 font-medium text-white">PRICE</th>
            <th scope="col" class="px-6 py-3 font-medium text-white">STOCK</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(product, index) in productWithCategory"
            :key="product.id"
            class="bg-slate-200 border-b border-default"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium text-heading whitespace-nowrap"
            >
              {{ index + 1 }}
            </th>
            <td class="px-6 py-4">{{ product.sku }}</td>
            <td class="px-6 py-4">{{ product.name }}</td>
            <td class="px-6 py-4">{{ product.category_name }}</td>
            <td class="px-6 py-4">{{ product.price }}</td>
            <td class="px-6 py-4">{{ product.stock }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
