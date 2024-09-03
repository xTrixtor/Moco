<template>
  <div
    class="w-5/6 bg-foreground border-2 border-border rounded-lg grid grid-cols-5 divide-x-2 divide-border p-6"
  >
    <div class="col-span-2 px-2">
      <div class="flex flex-col text-primary-text">
        <div class="underline underline-offset-4 text-primary mb-6 text-xl">
          Einstellungen für:
        </div>
        <div class="divide-y-2 divide-border flex flex-col gap-3">
          <div
            v-for="config in configs"
            @click="() => (selectedConfig = config)"
            class="text-highlight-text hover:text-primary underlineAnimation hover:cursor-pointer duration-300 h-full pt-2"
          >
            <p>{{ config }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="col-span-3">
      <ConfigurationFixedCost v-if="selectedConfig == 'Fix-Kosten'" />
      <ConfigurationBudget v-if="selectedConfig == 'Budgets'" />
      <ConfigurationProfil v-if="selectedConfig == 'Profil'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFixedCostStore } from "~/stores/fixedCostStore";

const selectedConfig = ref<string | undefined>(undefined);

const configs = ["Fix-Kosten", "Budgets", "Profil"];
onMounted(async () => {
  await useFixedCostStore().fetch();
});
</script>

<style scoped></style>
