<template>
  <div class="h-screen py-1">
    <FixedCostsInfoRow  />
  <div class="flex flex-col 2xl:flex-row gap-2">
    <div
      v-if="!loading"
      class="bg-slate-50 h-full flex-1 md:h-[80vh] flex flex-col md:flex-wrap items-start border-2 rounded-lg rounded-br-[2rem] rounded-tl-[2rem] p-4 shadow-xl"
    >
      <GroupCostCard :groupCost="group" v-for="group in groupCosts" />
      <FixedCostsBudgetCard/>
    </div>
    <BaseFullScreenLoader v-else/>
    <div class="h-full w-full 2xl:w-[500px] md:h-[80vh] border-2 rounded-lg rounded-bl-[2rem] rounded-tr-[2rem] shadow-xl">
      <FixedCostsCostOverviewChart/>
    </div>
  </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import GroupCostCard from "~/components/FixedCosts/GroupCostCard.vue";
import { useBudgetStore } from "~/stores/budgetStore";
import { useFixedCostStore } from "~/stores/fixedCostStore";

const { groupCosts } = storeToRefs(useFixedCostStore());

export interface SmartIntervalKey {
  timeIntervalKey: number;
  intervalString: string;
  isEmpty: boolean;
}

const loading = ref(false)

onMounted(async () => {
  loading.value = true;
  await useFixedCostStore().fetch();
  await useBudgetStore().fetch();
  loading.value= false;
});
</script>

<style scoped>


</style>
