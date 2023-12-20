<template>
    <div class="flex flex-col px-1 mt-2 mb-4 overflow-auto max-h-[30vh]">
        <div
          v-if="!budgets || budgets.length === 0"
          class="overflow-hidden"
        >
          <p class="text-center">Keine Daten</p>
        </div>
        <div v-else>
          <div
            v-for="(budget, key) in budgets"
            class="w-full py-1 flex border-b-2 border-slate-500"
            :class="[
              key % 2 ? '!bg-indigo-100 border-y-0' : 'bg-indigo-200',
              key == 0 ? 'rounded-tr-2xl' : '',
            ]"
          >
            <div :class="cellStyling">
              {{ budget.name }}
            </div>
    
            <div :class="cellStyling">
              <p class="truncate ...">{{ budget.limit }} €</p>
            </div>
            <div class="flex flex-1 justify-center items-center">
              <BudgetTableActionCell :dto="budget" label="dieses Budget" :delete-api-call="() => deleteBudgetById(budget.id)" />
            </div>
          </div>
        </div>
      </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useBudgetStore } from "~/stores/budgetStore";
import { cellStyling } from "~/metaData/styling";
import BudgetTableActionCell from "./TableActionCell.vue"
import { useApiStore } from "~/stores/apiStore";

const { budgets } = storeToRefs(useBudgetStore());
const apiStore = useApiStore();

const deleteBudgetById = async (id: number) => {
    await apiStore.BudgetClient.deleteBudgetEndpoint(id)
    await useBudgetStore().fetch();
}

onMounted(async () => {
  await useBudgetStore().fetch();
});
</script>

<style scoped>

</style>7