<script setup>
import { reactive } from "vue";
import { useStockStore } from "../stores/stockStore.js";

defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(["close"]);

const stockStore = useStockStore();

const form = reactive({
  sku: "",
  name: "",
  category_id: "",
  price: 0,
  stock: 0,
});

const handleSubmit = () => {
  if (!form.sku || !form.name || !form.category_id) {
    alert("Harap isi semua field yang wajib!");
    return;
  }

  stockStore.createProduct({ ...form });

  form.sku = "";
  form.name = "";
  form.category_id = "";
  form.price = 0;
  form.stock = 0;

  emit("close");
};
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
  >
    <div class="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 relative">
      <h2 class="text-xl font-semibold mb-4 text-slate-700">
        Tambah Produk Baru
      </h2>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-slate-600 mb-1"
            >SKU</label
          >
          <input
            v-model="form.sku"
            type="text"
            class="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-600 mb-1"
            >Nama Produk</label
          >
          <input
            v-model="form.name"
            type="text"
            class="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-600 mb-1"
            >Kategori</label
          >
          <select
            v-model="form.category_id"
            class="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
            required
          >
            <option disabled value="">Pilih Kategori</option>
            <option
              v-for="cat in stockStore.categories"
              :key="cat.id"
              :value="cat.id"
            >
              {{ cat.name }}
            </option>
          </select>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-slate-600 mb-1"
              >Harga (Rp)</label
            >
            <input
              v-model.number="form.price"
              type="number"
              min="0"
              class="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-600 mb-1"
              >Stok</label
            >
            <input
              v-model.number="form.stock"
              type="number"
              min="0"
              class="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
              required
            />
          </div>
        </div>

        <div class="flex justify-end gap-2 pt-2">
          <button
            type="button"
            @click="emit('close')"
            class="bg-gray-200 hover:bg-gray-300 text-slate-700 font-medium py-2 px-4 rounded-lg text-sm transition"
          >
            Batal
          </button>
          <button
            type="submit"
            class="bg-slate-800 hover:bg-slate-700 text-white font-medium py-2 px-4 rounded-lg text-sm transition"
          >
            Simpan Produk
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
