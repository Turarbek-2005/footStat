import { defineStore } from "pinia";
import { ref } from "vue";

export const useShop = defineStore("shop", {
  state: () => ({
    products: ref<any>([]),
  }),
  actions: {
    async fetchProducts() {
      try {
        const { data } = await useFetch("/api/football");
        this.products.value = data || [];
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    },
  },
});
