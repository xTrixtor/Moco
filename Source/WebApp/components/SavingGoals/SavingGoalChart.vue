<template>
  <div class="h-full">
    <Chart
      v-if="selectedSavingGoal"
      type="line"
      :data="chartData"
      :options="chartOptions"
      class="h-full"
    />
  </div>
</template>

<script setup lang="ts">
import Chart from "primevue/chart";
import { SavingGoalDto } from "~/stores/apiClient";

const props = defineProps<{ selectedSavingGoal: SavingGoalDto }>();

const chartData = computed(() => setChartData());
const chartOptions = computed(() => setChartOptions());

const setChartData = () => {
  const documentStyle = getComputedStyle(document.documentElement);

  return {
    labels: props.selectedSavingGoal.depositRates?.map((data) => {
      return data.key;
    }),
    datasets: [
      {
        label: props.selectedSavingGoal.name,
        data: props.selectedSavingGoal.depositRates?.map((data) => {
          return data.value;
        }),
        fill: false,
        borderColor: documentStyle.getPropertyValue("--cyan-500"),
        tension: 0,
      },
    ],
  };
};
const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--text-color");
  const textColorSecondary = documentStyle.getPropertyValue(
    "--text-color-secondary",
  );
  const surfaceBorder = documentStyle.getPropertyValue("--surface-border");

  return {
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
      y: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
    },
  };
};
</script>

<style scoped></style>
