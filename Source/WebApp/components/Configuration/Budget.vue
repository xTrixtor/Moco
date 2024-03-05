<template>
  <div class="flex flex-col h-full w-full p-4">
    <p class="text-xl text-primary underline underline-offset-4">
      Variable Kosten pro Monat
    </p>
    <div>
        <BudgetOverviewTable />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBudgetStore } from "~/stores/budgetStore";
import BudgetOverviewTable from "@/components/FixedCosts/Budget/OverviewTable.vue";

const budgetStore = useBudgetStore();

onMounted(async () => {
  await budgetStore.fetch();
});
</script>

<style scoped></style>
