<template>
  <div class="flex w-full flex-1 h-full p-4 bg-foreground">
      <Chart type="bar" :data="chartData" :options="chartOptions" class="w-full h-full" />
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ChargeDto } from "~/stores/apiClient";
import { useBudgetStore } from "~/stores/budgetStore";
import { useInspectionStore } from "~/stores/costInspectionStore";
import Chart from 'primevue/chart';

const budgetStore = useBudgetStore();
const costInspectionStore = useInspectionStore();

const budgets = computed(() => budgetStore.budgets);
const { selectedCostInspection } = storeToRefs(costInspectionStore);

const chartData2= computed(() => createBudgetChargesData());

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

const chartData = computed(() => setChartData())
const chartOptions = computed(() => setChartOptions())

const setChartData = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  return {
      labels: chartData2.value.map((budget) => budget.name),
      datasets: [
          {
              label: 'Limit',
              backgroundColor: ['rgba(45, 212, 191, 0.2)'],
              borderColor: ['rgb(45, 212, 191)'],
              data: chartData2.value.map((budget) => budget.limit),
              borderWidth: 1
          },
          {
              label: 'Aktuell ausgegeben',
              backgroundColor: ["rgb(100, 116, 139, 0.2)"],
              borderColor: ["rgb(100, 116, 139)"],
              data: chartData2.value.map((budget) => budget.currentValue),
              borderWidth: 1
          }
      ]
  };
};
const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue('--text-color');
  const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
  const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

  return {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
          legend: {
              labels: {
                  color: textColor
              }
          }
      },
      scales: {
          x: {
              ticks: {
                  color: textColorSecondary,
                  font: {
                      weight: 500
                  }
              },
              grid: {
                  display: false,
                  drawBorder: false
              }
          },
          y: {
              ticks: {
                  color: textColorSecondary
              },
              grid: {
                  color: surfaceBorder,
                  drawBorder: false
              }
          }
      }
  };
}

</script>
<style>
#chart {
  @apply w-full bg-foreground rounded-lg px-2 h-full !text-primary;
}
</style>
