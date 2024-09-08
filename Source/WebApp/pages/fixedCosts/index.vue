<template>
  <div class="flex flex-row w-full h-full">
    <div v-if="!loading" class="flex-1">
      <div id="dashboard" class="gap-4 h-full w-full">
        <div
          class="h-full col-span-5 row-span-3 w-full flex flex-col xl:flex-row justify-between items-center border-2 border-border bg-card rounded-lg text-primary-text shadow-lg"
        >
          <div class="flex-1 w-full h-full flex-col p-4 overflow-auto">
            <p
              class="font-semibold tracking-wide text-highlight-text text-lg underline underline-offset-2 mb-1"
            >
              Kalkulierte & statische Beträge
            </p>
            <div class="">
              <div
                v-if="overviewCosts != undefined"
                class="grid grid-cols-1 lg:grid-cols-4 gap-2 rounded-xl w-full h-full"
              >
                <OverviewCell
                  v-for="(overviewCost, key) in overviewCosts"
                  :cost="overviewCost"
                  class="!text-white flex-center"
                  :class="[key % 2 == 0 ? 'bg-gray-700' : 'bg-background']"
                />
              </div>
              <div v-else class="flex-center w-full">
                <p class="text-xl text-highlight-text underlineAnimation">
                  Keine Daten
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="!isMobil"
          class="col-span-2 row-span-4 flex flex-1 h-full w-full border-2 border-border rounded-lg rounded-bl-[2rem] rounded-tr-[2rem] shadow-xl bg-foreground"
        >
          <FixedCostsCostOverviewChart />
        </div>

        <div
          class="h-full px-2 col-span-5 lg:col-span-3 row-span-4 w-full flex flex-col justify-between items-center border-2 border-border bg-card rounded-lg text-primary-text shadow-lg divide-border divide-y-2"
        >
          <div class="h-1/2 w-full overflow-auto overflow-x-hidden">
            <div
              v-if="butgetBars.length != 0"
              class="grid grid-cols-1 lg:grid-cols-4 gap-2 w-full h-full p-3"
            >
              <div
                v-for="(budget, key) in butgetBars"
                :class="key%2?'':'bg-gray-700'"
                class="bg-background border-2 rounded border-border p-4 h-full max-h-[100px] w-full  hover:shadow-primary hover:shadow-lg hover:scale-105 hover:outline hover:outline-primary hover:text-highlight-text hover:rounded-sm duration-300 text-highlight-text flex"
              >
                <div class="flex flex-col w-full h-full">
                  {{ budget.monthlyBudget.name }}
                  <div class="flex h-6 relative w-full">
                    <div :style="budget.barstyling" class="flex w-full test">
                      <p
                        class="absolute w-full h-full text-white font-black flex-center"
                      >
                        {{ budget.chargeSum }}€ /
                        {{ budget.monthlyBudget.limit }}€
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="groupCosts"
            class="flex-1 w-full p-4 grid grid-cols-1 lg:grid-cols-4 gap-2 h-full"
          >
            <div
              v-for="(groupCost,key) in groupCosts"
              :class="key%2?'':'bg-gray-700'"
              class="text-center bg-background flex-col border-2 rounded border-border p-4 h-full max-h-[75px] w-full duration-300  hover:shadow-primary hover:shadow-lg hover:scale-105 hover:outline hover:outline-primary hover:text-highlight-text hover:rounded-sm text-highlight-text flex"
            >
              <div class="font-black underline decoration-2 underline-offset-2">
                {{ groupCost.name }}
              </div>
              <div class="text-secondary-light">
                {{
                  useSumBy(groupCost.fixedCosts, function (c) {
                    return c.value;
                  })
                }}
                €
              </div>
            </div>
          </div>
          <div
            v-if="fixedCostsByTimeInterval"
            class="flex-1 w-full p-4 grid grid-cols-1 lg:grid-cols-4 gap-2 h-full"
          >
            <div
              v-for="(intervalKey, key) in timeIntervalKeys"
              class="text-center bg-background flex-col border-2 rounded border-border p-4 h-full max-h-[75px] w-full duration-300  hover:shadow-primary hover:shadow-lg hover:scale-105 hover:outline hover:outline-primary hover:text-highlight-text hover:rounded-sm text-highlight-text flex"
              :class="key%2?'':'bg-gray-700'"
              >
              <div class="font-black underline decoration-2 underline-offset-2">
                {{ intervalKey }}
              </div>
              <div class="text-secondary-light">
                {{
                  useSumBy(
                    fixedCostsByTimeInterval[intervalKey.toLocaleLowerCase()],
                    function (c) {
                      return c.value;
                    }
                  )
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
import { useOverviewCostStore } from "~/stores/overviewCostStore";
import { useFixedCostStore } from "~/stores/fixedCostStore";
import { useInspectionStore } from "~/stores/costInspectionStore";
import { storeToRefs } from "pinia";
import OverviewCell from "@/components/FixedCosts/OverviewCell.vue";
import { ChargeDto, MonthlyBudgetDto, TimeInterval } from "~/stores/apiClient";
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

const timeIntervalKeys = Object.keys(TimeInterval).filter(
  (x) => !(parseInt(x) >= 0)
);

const loading = ref(false);
const overviewStore = useOverviewCostStore();
const { overviewCosts } = storeToRefs(overviewStore);
const { selectedCostInspection } = storeToRefs(useInspectionStore());
const { fixedCostsByTimeInterval } = storeToRefs(useFixedCostStore());

var butgetBars = computed(() =>
  calculateBar(selectedCostInspection?.value?.monthlyBudgets ?? [])
);

const calculateSumBgColor = (chargeSum: number, limit: number) => {
  const procent = chargeSum / limit;
  switch (true) {
    case procent > 0.8 && procent < 1:
      return "#FDE68A";
    case chargeSum >= limit:
      return "#EF4444";
    default:
      return "#6EE7B7";
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
    grid-template-rows: repeat(7, minmax(0, 1fr));
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
}
@media only screen and (max-width: 600px) {
  #dashboard {
    display: grid;
  }
}
</style>
