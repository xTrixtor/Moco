<template>
  <BaseMocoErrorBoundry>
    <Transition v-if="!loggedIn">
      <RegisterCard v-if="register" v-model="register" />
      <LoginCard v-else v-model="register" />
    </Transition>

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
const register = ref(false);
</script>

<style scoped>
.v-enter-active {
  transition: all 1s ease-out;
}

.v-leave-active {
  transition: all 0.6s ease;
}

.v-leave-to {
  transform: rotateY(180deg);
  opacity: 0;
}
.v-enter-from {
  opacity: 0;
}
.v-enter-to {
  opacity: 1;
}
</style>
