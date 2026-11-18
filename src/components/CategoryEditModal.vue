<script setup>
import { reactive, watch } from "vue";
import { useStockStore } from "../stores/stockStore.js";

const props = defineProps({
  isOpen: Boolean,
  category: Object,
});

const emit = defineEmits(["close"]);

const stockStore = useStockStore();

const form = reactive({
  name: "",
  description: "",
});

watch(
  () => props.category,
  (newCategory) => {
    if (newCategory) {
      Object.assign(form, newCategory);
    }
  },
  { immediate: true },
);

const handleSubmit = () => {
  if (!form.name || !form.description) {
    alert("Harap isi semua field yang wajib!");
    return;
  }

  stockStore.updateCategory(form.id, { ...form });
  emit("close");
};
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
  >
    <div class="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 relative">
      <h2 class="text-xl font-semibold mb-4 text-slate-700">Edit Kategori</h2>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-slate-600 mb-1"
            >Nama Kategori</label
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
            >Deskripsi Kategori</label
          >
          <input
            v-model="form.description"
            type="text"
            class="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
            required
          />
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
            Simpan Kategori
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
