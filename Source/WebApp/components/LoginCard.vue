<template>
  <BaseFullScreenLoader v-if="loading" />
  <div v-else class="grid justify-center items-center h-screen">
    <div
      class="w-[400px] h-[450px] shadow-xl rounded-lg p-4 flex flex-col border-2 shadow-primary-light bg-foreground"
    >
      <div class="justify-center flex flex-col items-center my-4">
        <NuxtImg src="/logo/logo.png" class="h-36 object-cover" />
        <div class="flex w-full justify-between">
          <NuxtLink to="/" class="flex-1 flex-center">
            <h1 class="text-4xl font-bold text-highlight-text tracking-widest">
              Finanz
            </h1>
            <h1 class="text-4xl font-bold text-primary tracking-widest">
              Horus
            </h1>
          </NuxtLink>
        </div>
      </div>
      <div
        class="w-full h-full flex-1 flex flex-col justify-evenly items-center"
      >
        <InputText type="text" v-model="user.username" placeholder="Username" />
        <Password
          v-model="user.password"
          :feedback="false"
          placeholder="Password"
        />
        <Button label="Anmelden" @click="handleLogin" outlined />
        <BasePrimaryButton
          btn-txt="Registirieren"
          :on-click="() => (data = true)"
          class="!bg-primary/20 !border-0 w-1/4 text-xs flex-center !rounded-lg"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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
