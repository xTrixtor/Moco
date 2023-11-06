<template>
  <NuxtErrorBoundary @error="handleError">
    <template #error="{ error, clearError }">
      <el-dialog
        :model-value="error !== undefined"
        title="Fehler beim Laden"
        :align-center="true"
        :before-close="clearError"
      >
        Fehler: {{ error }}
        <el-button type="primary" @click="clearError">Ok</el-button>
        <el-button type="info" @click="() => showError(error)"
          >Details</el-button
        >
      </el-dialog>
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
