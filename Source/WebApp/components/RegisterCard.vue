<template>
  <div class="grid justify-center items-center h-screen">
    <BaseFullScreenLoader v-if="loading" />
    <div
      v-else
      class="w-[500px] h-2/5 bg-[#242426] shadow-lg rounded-lg p-4 flex flex-col"
    >
      <div class="justify-center flex my-4">
        <NuxtImg src="/logo/MoFo-Logo-Hor.png" class="h-16" />
      </div>
      <div
        class="w-full h-full flex-1 flex flex-col justify-evenly items-center"
      >
        <div class="flex w-full">
          <CustomInput
            type="text"
            placeholder="Vorname"
            styling="!bg-secondary !text-white"
            v-model="user.firstname"
          />
          <CustomInput
            type="text"
            placeholder="Nachname"
            styling="!bg-secondary !text-white"
            v-model="user.lastname"
          />
        </div>
        <div class="flex w-full">
          <CustomInput
            type="text"
            placeholder="Email"
            styling="!bg-secondary !text-white"
            v-model="user.email"
          />
          <CustomInput
            type="text"
            placeholder="Username"
            styling="!bg-secondary !text-white"
            v-model="user.username"
          />
        </div>
        <div class="flex w-full">
          <CustomInput
            type="text"
            placeholder="Password"
            styling="!bg-secondary !text-white"
            v-model="user.password"
          />
          <CustomInput
            type="text"
            placeholder="Bestätige Password"
            styling="!bg-secondary !text-white"
            v-model="user.confirmpassword"
          />
        </div>
        <BasePrimaryButton btnTxt="Registrieren" :onClick="registerUser" />
        <el-button
          size="small"
          type="primary"
          class="!bg-brand/20 !border-0"
          :onClick="() => (data = false)"
          >Anmelden</el-button
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useApiStore } from "~/stores/apiStore";
import CustomInput from "./Base/CustomInput.vue";
import { CreateUserRequest } from "~/stores/apiClient";
import { useUserStore } from "~/stores/userStore";

const props = defineProps<{
  modelValue: boolean;
}>();
const emit = defineEmits(["update:modelValue"]);

const data = useVModel(props, "modelValue", emit);

const user = reactive<RegisterUser>({
  username: "",
  password: "",
  confirmpassword: "",
  email: "",
  firstname: "",
  lastname: "",
});
const loading = ref(false);
onKeyStroke("Enter", async (e) => {
  await registerUser();
});

const registerUser = async () => {
  loading.value = true;
  const req = {
    user: {
      username: user.username,
      firstName: user.firstname,
      lastName: user.lastname,
      email: user.email,
      enabled: true,
      credentials: [
        { temporary: false, type: "password", value: user.password },
      ],
    },
  };
  const res = await useApiStore().UserClient.createUserEndpoint(
    req as CreateUserRequest
  );

  sessionStorage.setItem("authToken", res.keycloakResponse?.access_token);
  sessionStorage.setItem("refreshToken", res.keycloakResponse?.refresh_token);
  useUserStore().setAuthToken(res.keycloakResponse?.access_token);
  loading.value = false;
};

interface RegisterUser {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmpassword: string;
}
</script>

<style scoped></style>
