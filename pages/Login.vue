<script setup lang="ts">
import { uuid } from "vue-uuid";

const formData = reactive({
  email: "",
  password: "",
  name: "",
});

const isLoadingStore = useIsLoadingStore();
const authStore = useAuthStore();
const router = useRouter();

const login = async () => {
  isLoadingStore.set(true);
  try {
    const currentSession = await account.get();

    if (currentSession) {
      console.log("Current session exists:", currentSession);
      await account.deleteSession("current");
    }
  } catch (error: any) {
    if (error.code !== 401) {
      console.error("Failed to get current session:", error);
    }
  }

  try {
    await account.createEmailPasswordSession(formData.email, formData.password);
    const response = await account.get();
    if (response) {
      authStore.set({
        email: response.email,
        name: response.name,
        status: response.status,
      });
    }

    formData.email = "";
    formData.password = "";
    formData.name = "";

    await router.push("/");
    isLoadingStore.set(false);
  } catch (error: any) {
    isLoadingStore.set(false);
  }
};

const register = async () => {
  await account.create(
    uuid.v4(),
    formData.email,
    formData.password,
    formData.name
  );
  await login();
};
</script>
<template>
  <div
    class="tw-flex tw-items-center tw-justify-center tw-min-h-screen tw-w-full"
  >
    <div class="tw-rounded tw-w-96 tw-p-3">
      <h1 class="tw-text-4xl tw-font-bold tw-text-center tw-mb-5">Login</h1>
      <form class="tw-flex tw-flex-col">
        <v-text-field
          v-model="formData.email"
          placeholder="Email"
          type="email"
          variant="outlined"
        />
        <v-text-field
          v-model="formData.password"
          placeholder="Password"
          type="password"
          variant="outlined"
        />
        <v-text-field
          v-model="formData.name"
          placeholder="name"
          type="name"
          variant="outlined"
        />
        <div class="tw-flex tw-items-center tw-justify-center tw-gap-5">
          <v-btn @click="login" class="tw-w-1/3">Login</v-btn>
          <v-btn @click="register" class="tw-w-1/3">Register</v-btn>
        </div>
      </form>
    </div>
  </div>
</template>
<style scoped></style>
