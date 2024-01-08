<template>
  <DxChart v-if="budgets" id="chart" :data-source="chartData" >
    <DxCommonSeriesSettings
      argument-field="name"
      type="bar"
    >
      <DxLabel :visible="true">
        <DxFormat :precision="0" />
      </DxLabel>
    </DxCommonSeriesSettings>
    <DxSeries value-field="limit" name="Limit" color="#70c2e7"/>
    <DxSeries value-field="currentValue" name="Aktueller Wert" color="#d070e7"/>
    <DxLegend vertical-alignment="bottom" horizontal-alignment="center" />
  </DxChart>
</template>
<script setup lang="ts">
import {
  DxChart,
  DxSeries,
  DxCommonSeriesSettings,
  DxLabel,
  DxFormat,
  DxLegend,
  DxTitle,
} from "devextreme-vue/chart";
import { storeToRefs } from "pinia";
import { ChargeDto } from "~/stores/apiClient";
import { useBudgetStore } from "~/stores/budgetStore";
import { useInspectionStore } from "~/stores/costInspectionStore";

const budgetStore = useBudgetStore();
const costInspectionStore = useInspectionStore();

const budgets = computed(() => budgetStore.budgets);
const {selectedCostInspection } =
  storeToRefs(costInspectionStore);

const chartData = computed(() => createBudgetChargesData());

const createBudgetChargesData = () => {
  return budgets.value.map((budget) => {
    const filteredBudgetCharges =
      selectedCostInspection.value.budgetCharges?.filter(
        (x) => x.budgetId === budget.id
      );
    return {
      name: budget.name,
      limit: budget.limit,
      currentValue: useSumBy(
        filteredBudgetCharges,
        function (charge: ChargeDto) {
          return charge.value;
        }
      ),
    };
  });
};

const calculateChargeBarColor = (value:any) => {
  console.log(value)
  return "#e7e770"
}
</script>
<style>
#chart {
  @apply w-full bg-foreground rounded-lg px-2 h-full !text-primary;
}
</style>
