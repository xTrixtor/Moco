<template>
  <ConfirmDialog />
  <NuxtLayout>
    <Toast />
    <div id="editModal"></div>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { usePrimeVue } from "primevue/config";
import { de } from "@/primevue/config/de.json";
import Toast from "primevue/toast";

onMounted(() => {
  const pvue = usePrimeVue();
  pvue.config.locale = de;
});
</script>

<style></style>
