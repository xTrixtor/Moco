<template>
  <div class="flex flex-row w-full h-full">
    <div v-if="!loading" class="flex-1">

      <div id="dashboard" class="gap-4 w-full h-full">
        <div
          class="h-full col-span-5 row-span-3 w-full flex flex-col xl:flex-row justify-between items-center border-2 border-border bg-card rounded-lg text-primary-text shadow-lg">
          <div class="flex flex-1 w-full h-full flex-col p-4">
            <p class="font-semibold tracking-wide text-highlight-text text-lg underline underline-offset-2 mb-1">
              Kalkulierte & statische Beträge
            </p>
            <div class="flex flex-1">
              <div v-if="overviewCosts != undefined"
                class="grid grid-cols-1 lg:grid-cols-5 gap-1 rounded-xl w-full h-full">
                <OverviewCell v-for="(overviewCost, key) in useOrderBy(overviewCosts, ['isStaticCost'], ['asc'])" :cost="overviewCost"
                  class="!text-white flex-center" :class="[overviewCost.isStaticCost ? 'bg-secondary' : 'bg-teal-800']" />
              </div>
              <div v-else class="flex-center w-full">
                <p class="text-xl text-highlight-text underlineAnimation">
                  Keine Daten
                </p>
              </div>
            </div>
          </div>
        </div>
        <div v-if="!isMobil"
          class="col-span-2 row-span-5 flex flex-1 h-full w-full border-2 border-border rounded-lg rounded-bl-[2rem] rounded-tr-[2rem] shadow-xl bg-foreground">
          <FixedCostsCostOverviewChart />
        </div>

        <div
          class="h-full px-2 col-span-5 lg:col-span-3 row-span-5 w-full flex flex-col justify-between items-center border-2 border-border bg-card rounded-lg text-primary-text shadow-lg divide-border divide-y-2">
          <div class="h-1/2 w-full overflow-auto overflow-x-hidden">
            <div v-if="butgetBars.length != 0" class="grid grid-cols-1 lg:grid-cols-3 gap-2 w-full h-full p-3">
              <div v-for="(budget, key) in butgetBars" :class="key%2?'':'bg-gray-700'"
                class="bg-background border-2 rounded border-border p-2 h-full max-h-[100px] w-full duration-300 text-highlight-text flex">
                <div class="flex flex-col w-full min-h-[60px]">
                  <label class="h-3/5 truncate">{{ budget.monthlyBudget.name }}</label>
                  <div class="flex h-2/5 relative w-full">
                    <div :style="budget.barstyling" class="flex w-full test">
                      <p class="absolute w-full h-full p-0 lg:p-3 text-sm text-highlight-white font-black flex-center">
                        {{ useCeil(budget.chargeSum, 2) }}€ /
                        {{ budget.monthlyBudget.limit }}€
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="groupCosts" class="flex-1 w-full p-4 grid grid-cols-1 lg:grid-cols-4 gap-2 h-full">
            <div v-for="(groupCost,key) in groupCosts" :class="key%2?'':'bg-gray-700'"
              class="text-center bg-background flex-col border-2 rounded border-border p-4 h-full max-h-[75px] w-full duration-300 text-highlight-text flex">
              <div class="font-black underline decoration-2 underline-offset-2">
                {{ groupCost.name }}
              </div>
              <div class="text-secondary-light">
                {{
                useCeil(useSumBy(groupCost.fixedCosts, function (c:FixedCostDto) {
                return c.value;
                }), 2)
                }}
                €
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <BaseFullScreenLoader v-else />
  </div>
</template>

<script setup lang="ts">
import { useBudgetStore } from "~/stores/budgetStore";
import { useOverviewCostStore, type OverviewCost } from "~/stores/overviewCostStore";
import { useFixedCostStore } from "~/stores/fixedCostStore";
import { useInspectionStore } from "~/stores/costInspectionStore";
import { storeToRefs } from "pinia";
import OverviewCell from "@/components/FixedCosts/OverviewCell.vue";
import { ChargeDto, FixedCostDto, MonthlyBudgetDto, TimeInterval } from "~/stores/apiClient";
import { useApiStore } from "@/stores/apiStore";
import { useUtilStore } from "~/stores/utilStore";
const { isMobil } = storeToRefs(useUtilStore());

export interface SmartIntervalKey {
  timeIntervalKey: number;
  intervalString: string;
  isEmpty: boolean;
}

export interface BudgetBar {
  monthlyBudget: MonthlyBudgetDto;
  chargeSum: number;
  barstyling: string;
}

const loading = ref(false);
const overviewStore = useOverviewCostStore();
const { overviewCosts } = storeToRefs(overviewStore);
const { selectedCostInspection } = storeToRefs(useInspectionStore());

var butgetBars = computed(() =>
  calculateBar(selectedCostInspection?.value?.monthlyBudgets ?? [])
);

const calculateSumBgColor = (chargeSum: number, limit: number) => {
  const procent = chargeSum / limit;
  switch (true) {
    case procent > 0.8 && procent < 1:
      return "#ca8a04";
    case chargeSum >= limit:
      return "#EF4444";
    default:
      return "#fef2f2";
  }
};

const calculateBar = (monthlyBudgets: MonthlyBudgetDto[]): BudgetBar[] => {
  return monthlyBudgets.map((budget) => {
    const chargeSum = useSumBy(budget.charges, function (x: ChargeDto) {
      return x.value;
    });

    const budgetLimit = budget.limit ?? 0;
    const width = (chargeSum / budgetLimit) * 100;

    const currentColor = calculateSumBgColor(chargeSum, budgetLimit);

    var widhtString = `background: linear-gradient(to right, ${currentColor} ${width}%, #7d7d7d ${width}%)`;

    return {
      monthlyBudget: budget,
      chargeSum: chargeSum,
      barstyling: widhtString,
    } as BudgetBar;
  });
};

const apiCall = async () => {
  const response = await useApiStore().GroupcostClient.getGroupCostEndpoint();

  return response.groupedCosts;
};

const groupCosts = computedAsync(apiCall, null, {
  onError(error) {
    console.error("Failed to load data:", error);
  },
});

onMounted(async () => {
  loading.value = true;
  await useFixedCostStore().fetch();
  await useBudgetStore().fetch();
  await useOverviewCostStore().calulateCostOverview();

  await useInspectionStore().fetch();

  overviewStore.calculateOverviewCosts();

  loading.value = false;
});
</script>

<style scoped>
@media only screen and (min-width: 800px) {
  #dashboard {
    display: grid;
    grid-template-rows: repeat(8, minmax(0, 1fr));
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
}
@media only screen and (max-width: 600px) {
  #dashboard {
    display: grid;
  }
}
</style>
