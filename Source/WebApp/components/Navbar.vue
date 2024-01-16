<template>
  <div
    v-if="isMobil"
    class="flex-center justify-between !h-[70px] !bg-background px-4"
    id="navbar"
  >
    <NuxtLink to="/">
      <NuxtImg class="h-12" src="/logo/MoFo-Logo-Hor.png" alt="Moco Logo" />
    </NuxtLink>
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
  <div v-else id="navbar" class="flex-center h-[10vh] bg-foreground mb-2 border-border border-b-2 rounded-b-sm">
    <div class="flex w-full justify-between">
      <div class="w-1/3 flex flex-1 items-center">
        <BaseSideBar />
      </div>
      <NuxtLink to="/" class="flex-1 flex-center">
        <NuxtImg class="h-16" src="/logo/MoFo-Logo-Hor.png" alt="Moco Logo" />
      </NuxtLink>
      <div class="w-1/3 flex justify-end items-center mr-2">
        <BaseLogoutTimer v-if="!isMobil" />
      </div>
    </div>
  </div>
  <div v-if="mobilMenuClick" class="bg-slate-200">
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
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useUserStore } from "~/stores/userStore";
import { navBarItems } from "../metaData/navaBarData";
import { useUtilStore } from "~/stores/utilStore";
import BaseSideBar from "@/components/Sidebar.vue";

const logout = () => {
  useUserStore().logout();
};

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
</style>
