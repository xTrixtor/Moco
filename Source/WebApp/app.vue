import { useUserStore } from './stores/userStore';
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { useUtilStore } from './stores/utilStore';

onMounted(() => {
  useUtilStore().calculateIsMobil();
})
</script>
