<template>
  <BaseFullScreenLoader v-if="loading" />
  <div v-else class="grid justify-center items-center h-screen bg-background">
    <div
      class="w-[400px] h-2/5 bg-foreground shadow-xl rounded-lg p-4 flex flex-col border-border border-2 shadow-primary-light"
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
          styling="!border-border !text-white"
          v-model="user.username"
        />
        <CustomInput
          type="password"
          placeholder="Password"
          styling="!border-border !text-white"
          v-model="user.password"
        />
        <BasePrimaryButton btnTxt="Anmelden" :onClick="handleLogin" />
        <el-button
          size="small"
          type="primary"
          class="!bg-primary/20 !border-0"
          :onClick="() => (data = true)"
          >Registieren</el-button
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CustomInput from "./Base/CustomInput.vue";
import { useUserStore } from "~/stores/userStore";
import { onKeyStroke } from "@vueuse/core";
import { useVModel } from "@vueuse/core";

const props = defineProps<{
  modelValue: boolean;
}>();
const emit = defineEmits(["update:modelValue"]);

const data = useVModel(props, "modelValue", emit);

onKeyStroke("Enter", async (e) => {
  await handleLogin();
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
