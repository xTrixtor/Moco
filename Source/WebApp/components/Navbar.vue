<template>
  <el-menu
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
      <el-menu-item index="1" class="h-14">
        <NuxtLink class="font-bold !text-lg !text-brand" to="/budget">Kosten Übersicht</NuxtLink>
      </el-menu-item>
      <el-menu-item index="1" class="h-14">
        <NuxtLink class="font-bold !text-lg !text-brand">Sparziele</NuxtLink>
      </el-menu-item>
      <el-menu-item index="1" class="h-14">
        <NuxtLink class="font-bold !text-lg !text-brand">Checklist</NuxtLink>
      </el-menu-item>
    </div>
    <div class="flex h-full justinfy-center mx-2">
      <BaseLogoutTimer />
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
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useUserStore } from "~/stores/userStore";

const activeIndex = ref("1");
const handleSelect = (key: string, keyPath: string[]) => {
};

const logout = () => {
  useUserStore().logout();
};
</script>

<style>
.el-sub-menu__icon-arrow {
  @apply !text-white;
}
</style>
