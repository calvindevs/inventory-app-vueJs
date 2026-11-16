import axios from "axios";
import { defineStore } from "pinia";

export const useStockStore = defineStore("stock", {
  state: () => ({
    products: [],
    categories: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchData() {
      this.loading = true;
      this.error = null;
      try {
        const [productResponse, categoryResponse] = await Promise.all([
          axios.get("/data/products.json"),
          axios.get("/data/categories.json"),
        ]);

        this.products = productResponse.data;
        this.categories = categoryResponse.data;
      } catch (error) {
        this.error = `Gagal mengambil data: ${error.message}`;
      } finally {
        this.loading = false;
      }
    },
  },
});
