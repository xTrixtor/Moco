<template >
  <div v-if="isMobil" class="flex-center justify-between !h-[70px] !bg-background px-4" id="navbar">
    <NuxtLink  to="/">
      <NuxtImg class="h-12" src="/logo/MoFo-Logo-Hor.png" alt="Moco Logo"/>
    </NuxtLink>
    <div 
      class="duration-300 rounded-full p-2 flex-center"
      :class="mobilMenuClick?'ring-2 ring-primary':''">
      <Icon name="material-symbols:menu" size="1.5rem" class="text-white" @click="() => mobilMenuClick = !mobilMenuClick" />
    </div>
  </div>
  <el-menu
    v-else
    id="navbar"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
    class="flex items-center justify-center !h-[8vh] !bg-background"
  >
    <el-menu-item index="0-0-0" class="bg-none">
      <NuxtLink to="/">
        <NuxtImg class="h-12" src="/logo/MoFo-Logo-Hor.png" alt="Moco Logo" />
      </NuxtLink>
    </el-menu-item>
    <div class="flex-1 flex justify-center items-center">
      <el-menu-item v-for="(navItem,key) in navBarItems" :key="key" :index="`${key}-${navItem.link}`" >
        <NuxtLink :to="navItem.link">
          <p class="font-bold xl:!text-lg !text-primary underlineAnimation before:bg-primary hover:bg-none">{{ navItem.name }}</p>
        </NuxtLink>
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
    <NuxtLink v-for="(navItem, key) in navBarItems" :key="key" :to="navItem.link" class="border-b-2" @click="mobilNavItemClick">
      <p class="flex-center py-2 text-lg font-medium text-thin underlineAnimation">{{ navItem.name }}</p>
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useUserStore } from "~/stores/userStore";
import { navBarItems } from "../metaData/navaBarData"
import { useUtilStore } from "~/stores/utilStore";

const handleSelect = (key: string, keyPath: string[]) => {
};

const logout = () => {
  useUserStore().logout();
};

const { isMobil } = useUtilStore();

const mobilMenuClick = ref(false);
const mobilNavItemClick = () => {
  mobilMenuClick.value = false;
}
</script>

<style>
.el-sub-menu__icon-arrow {
  @apply !text-white;
}
.el-menu-item:hover{
  @apply !bg-white/25 rounded-md;
}
.el-menu--horizontal>.el-sub-menu .el-sub-menu__title:hover {
  @apply !bg-white/25;
}
li:has(.router-link-active){
  @apply bg-primary-light/25 rounded-lg;
}
</style>
