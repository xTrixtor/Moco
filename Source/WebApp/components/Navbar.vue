<template>
  <div v-if="isMobil" class="flex-center justify-between !h-[70px] !bg-secondary px-4">
    <NuxtLink  to="/">
      <NuxtImg class="h-12" src="/logo/MoFo-Logo-Hor.png" alt="Moco Logo" />
    </NuxtLink>
    <div 
      class="duration-300 rounded-full p-2 flex-center"
      :class="mobilMenuClick?'ring-2 ring-brand':''">
      <Icon name="material-symbols:menu" size="1.5rem" class="text-white" @click="() => mobilMenuClick = !mobilMenuClick" />
    </div>
  </div>
  <el-menu
    v-else
    :default-active="activeIndex"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
    class="flex items-center justify-center !h-[70px] !bg-secondary"
  >
    <el-menu-item index="0">
      <NuxtLink to="/">
        <NuxtImg class="h-12" src="/logo/MoFo-Logo-Hor.png" alt="Moco Logo" />
      </NuxtLink>
    </el-menu-item>
    <div class="flex-1 flex justify-center items-center">
      <el-menu-item v-for="(navItem,key) in navBarItems" :index="`${key}`">
        <NuxtLink class="font-bold xl:!text-lg !text-brand" :to="navItem.link">{{navItem.name}}</NuxtLink>
      </el-menu-item>
    </div>
    <div class="flex h-[80%] justinfy-center mx-2">
      <BaseLogoutTimer v-if="!isMobil" />
    </div>
    <el-sub-menu index="2" class="h-14 flex justify-center items-center !px-0">
      <template #title>
        <Icon name="carbon:user-profile-alt" size="1.5rem" class="text-white" />
      </template>
      <el-menu-item index="2-2" class="w-full text-start">Profil</el-menu-item>

      <el-menu-item index="2-3"
        ><button @click="logout" class="w-full text-start">
          Abmelden
        </button></el-menu-item
      >
    </el-sub-menu>
  </el-menu>
  <div v-if="mobilMenuClick" class="h-full bg-slate-200">
    <NuxtLink v-for="navItem in navBarItems" :to="navItem.link">
      <p class="flex-center py-2 text-lg font-medium text-thin">{{ navItem.name }}</p>
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useUserStore } from "~/stores/userStore";
import { navBarItems } from "../metaData/navaBarData"

const activeIndex = ref("1");
const handleSelect = (key: string, keyPath: string[]) => {
};

const logout = () => {
  useUserStore().logout();
};

const isMobil = computed(() => calculateIfMobil())
const mobilMenuClick = ref(false);

const calculateIfMobil = (): boolean => {
  return screen.width < 768
}
</script>

<style>
.el-sub-menu__icon-arrow {
  @apply !text-white;
}
</style>
