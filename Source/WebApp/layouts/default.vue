<template>
  <BaseMocoErrorBoundry>
    <LoginCard v-if="!loggedIn" />
    <div v-else>
      <Navbar />
      <slot />
    </div>
  </BaseMocoErrorBoundry>
</template>

<script lang="ts" setup>
import { useUserStore } from "~/stores/userStore";

const userStore = useUserStore();

const loggedIn = computed(() => userStore.isAuthenticated);

onMounted(() => {
  userStore.validate();
});
</script>

<style scoped></style>
