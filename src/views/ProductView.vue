<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import { useStockStore } from "../stores/stockStore.js";
import ProductCreateModal from "../components/ProductCreateModal.vue";
import ProductEditModal from "../components/ProductEditModal.vue";

const stockStore = useStockStore();

const isModalOpen = ref(false);
const isEditModalOpen = ref(false);
const selectedProduct = ref(null);
const selectedCategory = ref("all");
const keyword = ref("");

const searchValue = computed(() => {
  return stockStore.products
    .map((product) => {
      const category = stockStore.categories.find((category) => {
        return category.id === product.category_id;
      });

      return {
        ...product,
        category_name: category ? category.name : "Unknown Category",
      };
    })
    .filter((product) => {
      const search = keyword.value.toLowerCase();
      const matchesSearch =
        product.name.toLowerCase().includes(search) ||
        product.category_name.toLowerCase().includes(search) ||
        String(product.price).includes(search) ||
        String(product.stock).includes(search);
      const matchedCategory =
        selectedCategory.value === "all" ||
        product.category_id === Number(selectedCategory.value);
      return matchesSearch && matchedCategory;
    });
});

function openEditModal(product) {
  selectedProduct.value = product;
  isEditModalOpen.value = true;
}

const handleDelete = (id, name) => {
  if (confirm(`Yakin ingin menghapus ${name}`)) {
    stockStore.deleteProduct(id);
  }
};

onMounted(() => {
  stockStore.fetchData();
});
</script>
<template>
  <div class="p-6">
    <div class="flex justify-between">
      <h1 class="text-3xl font-bold mb-4 text-slate-600">Product Management</h1>
      <div v-if="stockStore.loading" class="text-slate-500">Memuat Data...</div>
      <div
        v-else-if="stockStore.error"
        class="text-red-500 bg-red-50 p-4 rounded-lg"
      >
        {{ stockStore.error }}
      </div>

      <button
        @click="isModalOpen = true"
        class="bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 px-4 rounded-lg text-sm transition mb-4"
      >
        + Tambah Produk
      </button>
    </div>

    <div class="mb-3">
      <input
        type="search"
        id="search"
        class="w-4xl px-3 py-3 bg-blue-50 border text-lg text-sm rounded-lg focus:ring-blue-500 mr-4"
        placeholder="Search"
        required
        v-model="keyword"
      />
      <select
        class="border px-3 py-3 rounded-lg bg-blue-50"
        v-model="selectedCategory"
      >
        <option value="all">All Categories</option>
        <option
          v-for="category in stockStore.categories"
          :key="category.id"
          :value="category.id"
        >
          {{ category.name }}
        </option>
      </select>
    </div>

    <ProductCreateModal :is-open="isModalOpen" @close="isModalOpen = false" />
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
            <th scope="col" class="px-6 py-3 font-medium text-white">ACTION</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(product, index) in searchValue"
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
            <td class="px-6 py-4">
              <button
                @click="openEditModal(product)"
                class="bg-yellow-500 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg mr-2"
              >
                Edit
              </button>
              <button
                @click="handleDelete(product.id, product.name)"
                class="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <ProductEditModal
        :is-open="isEditModalOpen"
        :product="selectedProduct"
        @close="isEditModalOpen = false"
      />
    </div>
  </div>
</template>
