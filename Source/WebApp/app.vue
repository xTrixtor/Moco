<template>
  <ConfirmDialog />
  <NuxtLayout>
    <div id="editModal"></div>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { usePrimeVue } from "primevue/config";
import { de } from "@/primevue/config/de.json"


onMounted(() => {
  const pvue = usePrimeVue();
  pvue.config.locale = de;
})
</script>

<style>
</style>