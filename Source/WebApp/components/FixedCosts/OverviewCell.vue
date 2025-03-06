<template>
  <div
    class="flex flex-1 p-2 flex-col flex-start text-center duration-300 border-hightlight-bg text-secondary"
    @click="() => (showInfo = !showInfo)"
      >
    <div v-if="showInfo" class="flex-center w-full h-full flex-col">
      <div class="flex-center h-full w-full overflow-auto">
        {{ props.cost?.info ?? "Keine Information" }}
      </div>
    </div>
    <div class="flex h-full w-full flex-col" v-else>
      <div class="flex-1 flex-center flex-col">
        <div class="w-full mb-2">
          <p class="underline underline-offset-2">{{ props.cost.name }}</p>
        </div>
        <div class="">
          <p class="">{{ useRound(props.cost.value, 2) }} €</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { OverviewCost } from "@/stores/overviewCostStore";

const showInfo = ref(false);

const props = defineProps<{ cost: OverviewCost }>();
</script>

<style scoped></style>
