import { defineStore } from "pinia";
import { ref } from "vue";

export const useShop = defineStore("shop", {
  state: () => ({
    products: ref<any>([]),
  }),
  actions: {
    async fetchProducts(competitionId: string = "PL") {
      try {
        const { data } = await useFetch(
          `/api/football?competitionId=${competitionId}`
        );
        this.products.value = data || [];
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    },
  },
});
