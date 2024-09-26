<template>
  <div
    v-if="isMobil"
    class="flex-center justify-between !h-[70px] !bg-background px-4"
    id="navbar"
  >
    <NuxtLink to="/">
      <img class="h-12" :src="Logo" alt="FinanzHorus Logo" />
    </NuxtLink>
    <div class="flex-1 flex-center font-black text-xl">
      <p class="text-highlight-text">Finanz</p>
      <p class="text-primary">Horus</p>
    </div>
    <div
      class="duration-300 rounded-full p-2 flex-center"
      :class="mobilMenuClick ? 'ring-2 ring-primary' : ''"
    >
      <Icon
        name="material-symbols:menu"
        size="1.5rem"
        class="text-white"
        @click="() => (mobilMenuClick = !mobilMenuClick)"
      />
    </div>
  </div>
  <div
    v-else
    id="navbar"
    class="flex-center h-[10vh] bg-foreground border-border border-b-2 rounded-b-sm"
  >
    <div class="flex w-full justify-between">
      <NuxtLink to="/" class="flex-1 flex-center">
        <h1 class="text-4xl font-bold text-highlight-text tracking-widest">
          Finanz
        </h1>
        <h1 class="text-4xl font-bold text-primary tracking-widest">Horus</h1>
      </NuxtLink>
    </div>
  </div>
  <Transition>
    <div v-if="mobilMenuClick" class="bg-foreground text-highlight-text border-b-2 rounded-sm">
      <NuxtLink
        v-for="(navItem, key) in navBarItems"
        :key="key"
        :to="navItem.link"
        class="border-b-2"
        @click="mobilNavItemClick"
      >
        <p
          class="flex-center py-2 text-lg font-medium text-thin underlineAnimation"
        >
          {{ navItem.name }}
        </p>
      </NuxtLink>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { navBarItems } from "../metaData/navaBarData";
import { useUtilStore } from "~/stores/utilStore";
import Logo from "@/public/logo.png"

const { isMobil } = useUtilStore();

const mobilMenuClick = ref(false);
const mobilNavItemClick = () => {
  mobilMenuClick.value = false;
};
</script>

<style>
.el-sub-menu__icon-arrow {
  @apply !text-white;
}
.el-menu-item:hover {
  @apply !bg-white/25 rounded-md;
}
.el-menu--horizontal > .el-sub-menu .el-sub-menu__title:hover {
  @apply !bg-white/25;
}
li:has(.router-link-active) {
  @apply bg-primary-light !text-highlight-text rounded-lg;
}

.v-enter-active {
  transition: all .7s ease;
}

.v-leave-active {
  transition: all .5s ease;
}

.v-leave-to {
  transform: translateY(-100px);
  opacity: 0;
}
.v-enter-from {
  transform: translateY(-100px);
  opacity: 0;
}
.v-enter-to {
  opacity: 1;
}
</style>
