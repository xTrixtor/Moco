<template>
  <div
    class="flex-col p-2 border-l-2 border-y-2 border-border rounded-lg shadow-xl bg-foreground"
  >
    <p class="text-center text-xl pb-1 border-b-2 mb-2 mx-3 text-highlight-text">Variable Kosten</p>
    <div v-for="budget in selectedCostInspection.monthlyBudgets">
      <div
        class="flex-center py-3 bg-primary-hover relative hover:font-bold hover:text-primary cursor-pointer border-b-2 border-border text-highlight-text"
        @click="setBudget(budget)"
      >
        {{ budget.name }}
      </div>
    </div>
    <CostInspectionBudgetChargeDrawer v-model="drawer" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { MonthlyBudgetDto } from "~/stores/apiClient";
import { useBudgetStore } from "~/stores/budgetStore";
import { useInspectionStore } from "~/stores/costInspectionStore";

const budgetStore = useBudgetStore();

const { selectedMontlyBudget, selectedCostInspection } = storeToRefs(useInspectionStore());
const drawer = ref(false);

const setBudget = (budget: MonthlyBudgetDto) => {
  console.log(budget)
  selectedMontlyBudget.value = budget;
  drawer.value = true;
};

onMounted(async () => {
  await budgetStore.fetch();
});
</script>

<style scoped>

</style>

