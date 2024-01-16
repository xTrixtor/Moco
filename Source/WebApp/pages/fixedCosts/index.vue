<template>
    <div class="flex flex-col 2xl:flex-row gap-2">
      <div v-if="!loading" class="flex-1">
        <FixedCostsInfoRow />
        <div
          class="bg-foreground h-full flex-1 md:h-[72vh] flex flex-col md:flex-wrap items-start border-2 border-border rounded-lg rounded-br-[2rem] rounded-tl-[2rem] p-4 shadow-xl"
        >
          <GroupCostCard :groupCost="group" v-for="(group,key) in groupCosts" :key="key" />
          <AddGroupCostCard />
          <BudgetCard />
        </div>
      </div>
      <BaseFullScreenLoader v-else />
      <div
        class="h-full w-full 2xl:w-[500px] border-2 border-border rounded-lg rounded-bl-[2rem] rounded-tr-[2rem] shadow-xl py-4 px-2 bg-foreground"
      >
        <FixedCostsCostOverviewChart />
      </div>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import GroupCostCard from "~/components/FixedCosts/GroupCostCard.vue";
import { useBudgetStore } from "~/stores/budgetStore";
import { useOverviewCostStore } from "~/stores/overviewCostStore";
import { useFixedCostStore } from "~/stores/fixedCostStore";
import BudgetCard from "~/components/FixedCosts/Budget/BudgetCard.vue";
import AddGroupCostCard from "~/components/FixedCosts/AddGroupCostCard.vue";

const { groupCosts } = storeToRefs(useFixedCostStore());

export interface SmartIntervalKey {
  timeIntervalKey: number;
  intervalString: string;
  isEmpty: boolean;
}

const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  await useFixedCostStore().fetch();
  await useBudgetStore().fetch();
  await useOverviewCostStore().calulateCostOverview();
  loading.value = false;
});
</script>

<style scoped></style>
