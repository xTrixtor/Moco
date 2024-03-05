<template>
    <div class="flex flex-col 2xl:flex-row gap-2">
      <div v-if="!loading" class="flex-1">
        <FixedCostsInfoRow />
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
import { useBudgetStore } from "~/stores/budgetStore";
import { useOverviewCostStore } from "~/stores/overviewCostStore";
import { useFixedCostStore } from "~/stores/fixedCostStore";


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
