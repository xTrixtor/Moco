<template>
  <div
    class="xl:h-[15vh] w-full flex flex-col xl:flex-row justify-between items-center border-2 border-border bg-card rounded-lg text-primary-text shadow-lg mb-2"
  >
    <div
      class="w-full grid xl:grid-rows-3 xl:grid-cols-4 md:grid-cols-2 grid-cols-1 xl:grid-flow-col rounded-xl mx-2 p-1"
    >
    
      <OverviewCell
        v-for="(overviewCost, key) in overviewCosts"
        :key="key"
        :name="overviewCost.name"
        :value="overviewCost.value"
        :class="[
            selectedOverviewCost === overviewCost
            ? 'duration-300 bg-primary !text-highlight-text'
            : '',
        ]"
      />
      <OverviewCell
        v-for="(groupCost, key) in groupCostOptions"
        :key="key"
        :name="groupCost.name"
        :value="groupCost.sum"
        class=""
        :class="[
          selectedGroupCost.id === groupCost.id
            ? 'duration-500 bg-primary !text-highlight-text'
            : '',
        ]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useOverviewCostStore } from "~/stores/overviewCostStore";
import OverviewCell from "./OverviewCell.vue";
import { storeToRefs } from "pinia";
import { useFixedCostStore } from "~/stores/fixedCostStore";

const { overviewCosts, selectedOverviewCost } = storeToRefs(
  useOverviewCostStore()
);
const { selectedGroupCost, groupCostOptions } = storeToRefs(
  useFixedCostStore()
);
</script>

<style scoped>
#addButton:hover {
  svg {
    @apply rotate-180;
  }
}
</style>
