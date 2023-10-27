<template>
  <BaseFullScreenLoader v-if="loading" />
  <div v-else class="grid justify-center items-center bg-slate-50 h-screen">
    <div
      class="w-[500px] h-2/5 bg-[#242426] shadow-lg rounded-lg p-4 flex flex-col"
    >
      <div class="justify-center flex my-4">
        <NuxtImg src="/logo/MoFo-Logo-Hor.png" class="h-16" />
      </div>
      <div
        class="w-full h-full flex-1 flex flex-col justify-evenly items-center"
      >
        <CustomInput
          type="text"
          placeholder="Username"
          styling="!bg-secondary !text-white"
          v-model="user.username"
        />
        <CustomInput
          type="password"
          placeholder="Password"
          styling="!bg-secondary !text-white"
          v-model="user.password"
        />
        <BasePrimaryButton btnTxt="Anmelden" :onClick="handleLogin" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CustomInput from "./Base/CustomInput.vue";
import { MocoApiEndpointsUserLoginRequest } from "~/stores/apiClient";
import { useUserStore } from "~/stores/userStore";
import { onKeyStroke } from "@vueuse/core";
import { storeToRefs } from "pinia";

onKeyStroke("Enter", async (e) => {
  const a = await handleLogin();
});

interface User {
  username: string;
  password: string;
}

const userStore = useUserStore();

onMounted(() => {
  useUserStore().validate();
  loading.value = false;
});

const loading = ref(true);

const user = reactive<User>({ username: "", password: "" });

const handleLogin = async () => {
  if (user.username && user.password) {
    //@ts-ignore
    const loginRequest: MocoApiEndpointsUserLoginRequest = {
      username: user.username,
      password: user.password,
    };
    const a = await userStore.login(loginRequest);
  }
};
</script>

<style scoped></style>
