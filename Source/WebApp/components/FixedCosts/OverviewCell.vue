<template>
  <div
    class="h-full p-4 flex-col flex-start text-center duration-300 hover:shadow-primary hover:shadow-lg hover:scale-105 hover:outline hover:outline-primary hover:text-highlight-text hover:rounded-sm border-hightlight-bg text-secondary"
  >
    <div v-if="showInfo" class="flex-center w-full h-full flex-col">
      <div class="w-full flex justify-end">
        <Icon
          name="akar-icons:cross"
          size="1.5rem"
          class="hover:text-primary hover:cursor-pointer"
          @click="() => (showInfo = false)"
        />
      </div>
      <div class="flex-center h-full w-full">
        {{ props.cost?.info ?? "Keine Information" }}
      </div>
    </div>
    <div class="flex h-full w-full flex-col" v-else>
      <div class="w-full flex justify-end mb-2">
        <Icon
          name="material-symbols:info-outline"
          size="2rem"
          class="hover:text-primary hover:cursor-pointer"
          @click="() => (showInfo = true)"
        />
      </div>
      <div class="flex-1 flex-center flex-col text-lg">
        <div class="w-full mb-2">
          <p class="underline underline-offset-2">{{ props.cost.name }}</p>
        </div>
        <div class="">
          <p class="">{{ useCeil(props.cost.value, 2) }} €</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { OverviewCost } from "@/stores/overviewCostStore";

const showInfo = ref(false);

const props = defineProps<{ cost: OverviewCost }>();
</script>

<style scoped></style>
