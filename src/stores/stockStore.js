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
        const [products, categories] = await Promise.all([
          this.getData("products", "/data/products.json"),
          this.getData("categories", "/data/categories.json"),
        ]);
        this.products = products;
        this.categories = categories;
      } catch (error) {
        this.error = `Gagal mengambil data: ${error.message}`;
      } finally {
        this.loading = false;
      }
    },

    async getData(key, url) {
      const savedData = localStorage.getItem(key);
      if (savedData) {
        return JSON.parse(savedData);
      }
      const response = await axios.get(url);
      localStorage.setItem(key, JSON.stringify(response.data));
      return response.data;
    },

    async createProduct(newProduct) {
      const productWithId = {
        id: Date.now(),
        ...newProduct,
      };

      this.products.push(productWithId);
      localStorage.setItem("products", JSON.stringify(this.products));
    },

    async createCategory(newCategory) {
      const categoryWithId = {
        id: Date.now(),
        ...newCategory,
      };

      this.categories.push(categoryWithId);
      localStorage.setItem("categories", JSON.stringify(this.categories));
    },
  },
});
