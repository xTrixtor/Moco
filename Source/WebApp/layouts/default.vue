<template>
  <BaseMocoErrorBoundry>
    <Transition v-if="!loggedIn">
      <RegisterCard v-if="register" v-model="register" />
      <LoginCard v-else v-model="register" />
    </Transition>

    <div v-else class="bg-background h-screen">
      <div class="grid-cols-5 flex">
        <div class="col-span-2">
          <Sidebar v-if="!isMobil" />
        </div>
        <div class="col-span-3 flex-1">
          <Navbar />
          <div class="flex w-full  p-6" :class="isMobil?'h-full':'h-[90svh]'">
            <slot />
          </div>
        </div>
      </div>
    </div>
    <BaseScrollButton v-if="isMobil" />
  </BaseMocoErrorBoundry>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useUserStore } from "~/stores/userStore";
import { useUtilStore } from "~/stores/utilStore";

const { isMobil } = storeToRefs(useUtilStore());

const userStore = useUserStore();

const loggedIn = computed(() => userStore.isAuthenticated);
const register = ref(false);

onMounted(() => {
  useUtilStore().calculateIsMobil();
});
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
