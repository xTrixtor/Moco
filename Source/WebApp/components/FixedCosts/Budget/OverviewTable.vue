<template>
    <div class="flex-1 flex-col px-1 mt-2 overflow-auto max-h-[30vh]">
        <div
          v-if="!budgets || budgets.length === 0"
          class="overflow-hidden"
        >
          <p class="text-center">Keine Daten</p>
        </div>
        <div v-else>
          <div
            v-for="(budget, key) in budgets"
            class="w-full py-1 flex border-b-2 border-border"
            :class="[
              key % 2 ? '!bg-secondary-light border-y-0' : 'bg-secondary',
              key == 0 ? 'rounded-tr-2xl' : '',
            ]"
            :key="`${budget.id}-${key}`"
          >
            <div class="w-[60%]" :class="cellStyling">
              <BaseEditInput v-model="budget.name" type="text" @leave="handleUpdateCharge(budget)" class="truncate flex-1" />
            </div>
    
            <div class="w-[35%] flex-1" :class="cellStyling">
              <BaseEditInput v-model="budget.limit" type="number" @leave="handleUpdateCharge(budget)" class="truncate flex-1" input-extension="€"/>
            </div>
            <div class="flex justify-center items-center">
              <TableActionCell :unique-key="`${key}`" :dto="budget" label="dieses Budget" :delete-api-call="() => deleteBudgetById(budget.id)" />
            </div>
          </div>
          <InlineAddRow model="createBudgetModalVis" />
        </div>
      </div>
</template>

<script setup lang="ts">
import { useBudgetStore } from "~/stores/budgetStore";
import { cellStyling } from "~/metaData/styling";
import TableActionCell from "@/components/FixedCosts/TableActionCell.vue"
import { useApiStore } from "~/stores/apiStore";
import { useOverviewCostStore } from "~/stores/overviewCostStore";
import InlineAddRow from "./InlineAddRow.vue";
import { BudgetDto, UpdateBudgetRequest } from "~/stores/apiClient";
import { storeToRefs } from "pinia";

const { budgets } = storeToRefs(useBudgetStore());
const apiStore = useApiStore();

const initialBudgets = {...budgets.value}

const deleteBudgetById = async (id: number) => {
    await apiStore.BudgetClient.deleteBudgetEndpoint(id)
    await useBudgetStore().fetch();
    await useOverviewCostStore().calulateCostOverview();
}
const handleUpdateCharge = async(updatedBudget: BudgetDto) => {
      const oldVersion = useFindKey(initialBudgets, function(o: BudgetDto) { return o.id == updatedBudget.id})
      const isDirt = (oldVersion?.name !== updatedBudget.name || oldVersion?.limit !== updatedBudget.limit)

      if(!isDirt) return;
      await useApiStore().BudgetClient.updateButgetEndpoint({uBudgetDto:updatedBudget} as UpdateBudgetRequest)
      await useBudgetStore().fetch();
  }
</script>

<style scoped>

</style>7