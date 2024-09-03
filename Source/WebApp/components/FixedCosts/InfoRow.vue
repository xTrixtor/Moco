<template>
  <div
    class="xl:h-1/2 w-full flex flex-col xl:flex-row justify-between items-center border-2 border-border bg-card rounded-lg text-primary-text shadow-lg mb-2"
  >
    <div
      class="gridgrid-cols-2 gap-5 rounded-xl mx-2 p-1"
    >
      <OverviewCell
        v-for="(overviewCost, key) in combinedCosts.concat(combinedCosts).concat(combinedCosts)"
        :key="key"
        :name="overviewCost.name"
        :value="overviewCost.value"
        class="!text-white"
        :class="[
          selectedOverviewCost === overviewCost
            ? 'duration-300 bg-primary'
            : '',
          key % 2 == 0 ? 'bg-gray-700' : 'bg-background',
        ]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { OverviewCost, useOverviewCostStore } from "~/stores/overviewCostStore";
import OverviewCell from "./OverviewCell.vue";
import { storeToRefs } from "pinia";
import { GroupCostOption, useFixedCostStore } from "~/stores/fixedCostStore";

const { overviewCosts, selectedOverviewCost } = storeToRefs(
  useOverviewCostStore()
);
const { selectedGroupCost, groupCostOptions } = storeToRefs(
  useFixedCostStore()
);

const combinedCosts = computed(() => createCombiedOverviewCosts(groupCostOptions.value))

const createCombiedOverviewCosts = (groupCost: GroupCostOption[]): OverviewCost[] => {
  const convertedOverviewCosts = groupCost.map<OverviewCost>(x =>{
    return {id: x.id, name: x.name, value: x.sum}
  })
  return convertedOverviewCosts.concat(overviewCosts.value);
}
</script>

<style scoped>
#addButton:hover {
  svg {
    @apply rotate-180;
  }
}
</style>
