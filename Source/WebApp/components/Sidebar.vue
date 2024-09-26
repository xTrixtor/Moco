<template>
  <div class="w-64 h-screen bg-foreground border-r-2 border-border">
    <div class="flex-center flex-col h-full mx-4">
      <div
        class="border-b-2 h-[10vh] w-full flex-center border-border border-opacity-5"
      >
        <NuxtLink to="/">
          <img :src="Logo" alt="Moco Logo" class="h-24" />
        </NuxtLink>
      </div>
      <div class="flex flex-col w-full items-start my-5">
        <NuxtLink
          v-for="(navItem, key) in navBarItems"
          :key="key"
          :index="`${key}-${navItem.link}`"
          :to="navItem.link"
          class="flex my-4 text-highlight-text underlineAnimation hover:text-primary flex-1 w-full pb-2"
        >
          <Icon :name="navItem.icon" size="1.5rem" class="mr-4" />
          <p
            class="font-bold xl:!text-md hover:text-primary before:bg-primary hover:bg-none"
          >
            {{ navItem.name }}
          </p>
        </NuxtLink>
      </div>
      <div class="flex-1 h-full flex justify-end">
        <div class="flex items-end my-2">
          <BaseLogoutTimer />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { navBarItems } from "../metaData/navaBarData";
import Logo from "@/public/logo.png"
</script>

<style scoped></style>
