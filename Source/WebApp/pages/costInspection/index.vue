<template>
  <div class="flex flex-col flex-1 w-full h-full">
    <CostInspectionDatePickerRow />
    <div v-if="!selectedCostInspection" class="flex-center">
      <CostInspectionCreateInspectionButton />
    </div>
    <div v-else class="grid grid-rows-2 xl:grid-cols-5 xl:grid-rows-1 w-full h-full gap-3">
      <div class="col-span-3 xl:col-span-2 flex-col flex gap-3">
        <CostInspectionOverviewRow/>
        <div class="flex flex-1 w-full h-full gap-3">
          <CostInspectionFixedCostChecklist />
          <CostInspectionBudgetInspection />
        </div>
      </div>
      <div class="col-span-3 flex-col flex">
        <div
          class="bg-background/10 flex-1 w-full border-2 border-border rounded-lg"
        >
          <CostInspectionBudgetSideBySideChart />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useInspectionStore } from "~/stores/costInspectionStore";
import { useFixedCostStore } from "~/stores/fixedCostStore";

const { selectedCostInspection } = storeToRefs(useInspectionStore());
onMounted(async () => {
  try {
    await useInspectionStore().fetch();
    await useFixedCostStore().fetch();
  } catch (e) {}
});
</script>

<style scoped></style>
