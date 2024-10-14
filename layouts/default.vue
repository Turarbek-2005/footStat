<script setup lang="ts">
import { useTheme } from "vuetify";

const theme = useTheme();
theme.global.name.value = "dark";

const isLoadingStore = useIsLoadingStore();
const store = useAuthStore();
const router = useRouter();

onMounted(async () => {
  try {
    const user = await account.get();
    if (user) store.set(user);
  } catch (error) {
    router.push("/login");
  } finally {
    isLoadingStore.set(false);
  }
});

const logout = async () => {
  isLoadingStore.set(true);
  await account.deleteSession("current");
  store.clear();
  await router.push("/login");
  isLoadingStore.set(false);
};

router.beforeEach(
  (to: { path: string }, from: { path: string }, next: () => void) => {
    if (to.path === "/login" && from.path !== "/login") {
      logout();
    }
    next();
  }
);
</script>
<template>
  <LayoutLoader v-if="isLoadingStore.isLoading" />
  <section v-else>
    <LayoutSidebar v-if="store.isAuth" />
    <div :class="{ padding: store.isAuth }">
      <slot></slot>
    </div>
  </section>
</template>
<style scoped>
.padding {
  padding-top: 5rem;
  min-height: calc(100vh - 5rem);
}
</style>
