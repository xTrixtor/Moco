<template>
  <div
    class="fixed bottom-0 left-0 w-8 h-8 m-4 flex-center rounded-full bg-secondary ring-slate-300 ring-2 hover:ring-offset-2 duration-300 hover:bg-slate-600 cursor-pointer"
  >
    <Icon
      name="basil:logout-solid"
      size="1.5rem"
      @click="logout"
      color="white"
      class="flex-1"

    />
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/userStore';

const logout = () => {
  useUserStore().logout();
};
</script>

<style scoped></style>
