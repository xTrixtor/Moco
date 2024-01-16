<template>
  <div class="flex-center flex-col w-full ">
    <CostInspectionDatePickerRow />
    <CostInspectionCreateInspectionButton v-if="!selectedCostInspection" />
    <div v-else class="grid grid-cols-5 w-full h-[80vh] gap-3">
      <CostInspectionFixedCostChecklist />
      <CostInspectionBudgetInspection/>
      <div class="col-span-3 bg-background/10 w-full border-2 border-border rounded-lg">
        <CostInspectionBudgetSideBySideChart/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useInspectionStore } from "~/stores/costInspectionStore";

const { selectedCostInspection } = storeToRefs(
  useInspectionStore()
);

onMounted(async () => {
  try {
    await useInspectionStore().fetch();
  } catch (e) {}
});
</script>

<style scoped></style>
