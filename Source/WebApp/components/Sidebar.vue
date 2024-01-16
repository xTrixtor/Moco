<template>
  <Transition name="fadeIn">
    <div
      v-if="sidebarVis"
      ref="target"
      class="w-80 h-screen absolute left-0 top-0 backdrop-blur-xl z-[999]"
    >
      <div class="flex-center flex-col mx-4">
        <div
          class="border-b-2 h-[10vh] w-full flex-center border-border border-opacity-5"
        >
          <NuxtLink to="/">
            <NuxtImg
              src="/logo/MoFo-Logo-Hor.png"
              alt="Moco Logo"
              class="h-16"
            />
          </NuxtLink>
        </div>
        <div class="flex flex-col w-full items-start my-5">
          <NuxtLink
            v-for="(navItem, key) in navBarItems"
            :key="key"
            :index="`${key}-${navItem.link}`"
            :to="navItem.link"
            class="flex my-4 text-md text-highlight-text underlineAnimation hover:text-primary flex-1 w-full pb-2"
          >
            <Icon :name="navItem.icon" size="2rem" class="mr-4" />
            <p
              class="font-bold xl:!text-lg hover:text-primary before:bg-primary hover:bg-none"
            >
              {{ navItem.name }}
            </p>
          </NuxtLink>
        </div>
      </div>
    </div>
    <Button
      v-else
      @click="sidebarVis = true"
      outlined
      class="text-white"
      :pt="{ root: { class: 'p-1 mx-2' } }"
    >
      <Icon name="material-symbols:menu" size="2rem" />
    </Button>
  </Transition>
</template>

<script setup lang="ts">
import { navBarItems } from "../metaData/navaBarData";

const target = ref();
const sidebarVis = ref(false);

onClickOutside(target, () => {
  sidebarVis.value = false;
});
</script>

<style scoped>
.fadeIn-enter-active {
  transition: all 0.5s ease-in;
}

.fadeIn-leave-active {
  transition: all 0.5s ease-in;
}

.fadeIn-leave-to {
  transform: translateX(-200px);
  opacity: 0;
}
.fadeIn-enter-from {
  transform: translateX(-200px);
  opacity: 0;
}
.fadeIn-enter-to {
  opacity: 1;
}
</style>
