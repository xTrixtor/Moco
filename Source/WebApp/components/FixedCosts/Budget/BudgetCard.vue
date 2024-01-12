<template>
  <div
    ref="target"
    @click="overviewCostStore.setSelectedOverviewCostById(3)"
    class="bg-card max-h-[50vh] min-h-[5vh] w-full md:w-[300px] overflow-auto ring-2 ring-border rounded-lg rounded-br-[2rem] rounded-tl-[2rem] shadow-lg shadow-slate-400 hover:ring-offset-2 hover:ring-primary duration-200 cursor-pointer"
  >
    <div class="flex-center border-b-2 py-2 mx-2">
      <p class="ml-2 text-lg text-highlight-text flex-1">Budgets pro Monat</p>
    </div>
    <BudgetOverviewTable />
  </div>
</template>

<script setup lang="ts">
import BudgetOverviewTable from "./OverviewTable.vue";
import { useOverviewCostStore } from "~/stores/overviewCostStore";

const overviewCostStore = useOverviewCostStore();

const target = ref(null);
onClickOutside(target, () => overviewCostStore.setSelectedOverviewCostById(0));
</script>

<style scoped></style>
