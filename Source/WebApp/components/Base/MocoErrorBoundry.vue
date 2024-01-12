<template>
  <NuxtErrorBoundary @error="handleError">
    <template #error="{ error, clearError }">
      <Dialog
        :visible="error !== undefined"
        modal header="Fehler beim Laden"
        :before-close="clearError"
      >
        Fehler: {{ error }}
        <Button  @click="clearError">Ok</Button>
      </Dialog>
    </template>
    <template #default>
      <slot />
    </template>
  </NuxtErrorBoundary>
</template>

<script setup lang="ts">

const handleError = (e: any) => {
  console.error(e.status);
  if (e.status === 401) {
    sessionStorage.setItem("authToken", "");
    location.reload();
  }
};
</script>
