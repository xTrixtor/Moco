<template>
    <div
    class="bg-indigo-300 max-h-[50vh] min-h-[5vh] w-full md:w-[300px] ring-2 ring-slate-300 rounded-lg rounded-br-[2rem] rounded-tl-[2rem] m-2 shadow-lg shadow-slate-400 hover:ring-offset-2 hover:ring-brand duration-200 cursor-pointer"
  >
    <div class="flex-center border-b-2 py-2 mx-2">
      <p class="ml-2 text-lg flex-1">Budgets pro Monat</p>
    </div>
    <BudgetOverviewTable />
    <div
      class="w-full bg-yellow-100 py-1 flex justify-between px-4 font-medium text-sm rounded-br-[2rem] rounded-bl-md"
    >
      <div>Summe:</div>
      <div>
        {{
          useCeil(useSumBy(budgets, function (o: BudgetDto){return o.limit},2))
        }}
        €
      </div>
    </div>
  </div>
    
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { BudgetDto } from "~/stores/apiClient";
import { useBudgetStore } from "~/stores/budgetStore";
import BudgetOverviewTable from "./Budget/OverviewTable.vue"

const { budgets } = storeToRefs(useBudgetStore());

</script>

<style scoped></style>
