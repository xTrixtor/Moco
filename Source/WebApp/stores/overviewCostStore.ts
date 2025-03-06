import { defineStore, storeToRefs } from "pinia";
import { useFixedCostStore } from "./fixedCostStore";
import {
  BudgetDto,
  CostInspectionDto,
  FixedCostDto,
  MonthlyBudgetDto,
  RevenueDto,
} from "./apiClient";
import { useBudgetStore } from "./budgetStore";
import { useApiStore } from "./apiStore";
import { useInspectionStore } from "./costInspectionStore";
import { useUserStore } from "./userStore";
import { useUtilStore } from "~/stores/utilStore";


export interface OverviewCost {
  name: string;
  value: number;
  info?: string | undefined;
  isStaticCost: boolean;
}

export interface ChartData {
  labels: string[];
  datasets: number[];
}

export const useOverviewCostStore = defineStore("costOverview", {
  state: () => {
    const overviewCosts: OverviewCost[] = [];
    const totalRevenue: OverviewCost = {
      name: "Gehalt",
      value: 0,
      isStaticCost: true,
    };
    const fixedCost: OverviewCost = {
      name: "Fix Kosten",
      value: 0,
      info: "",
      isStaticCost: true,
    };
    const budgetCost: OverviewCost = {
      name: "Variable Kosten",
      value: 0,
      info: undefined,
      isStaticCost: true,
    };
    const availibleMoney: OverviewCost = {
      name: "Aktuelles Geld mit Abzügen",
      value: 0,
      info: "Gehalt minus alle Kosten welche gespeichert wurden",
      isStaticCost: false,
    };

    const pieChartData: ChartData = {} as ChartData;

    const selectedOverviewCost: OverviewCost = {} as OverviewCost;
    return {
      totalRevenue,
      fixedCost,
      budgetCost,
      availibleMoney,
      overviewCosts,
      pieChartData,
      selectedOverviewCost,
    };
  },
  actions: {
    calculateOverviewCosts() {
      const { selectedCostInspection } = storeToRefs(useInspectionStore());

      if (selectedCostInspection.value == undefined) {
        this.overviewCosts = undefined;
        return;
      }

      const monthlyRevenue = this.calculateMonthyRevenue(
        selectedCostInspection.value
      );
      const fixcostSum = this.calculateFixedCostSum(
        selectedCostInspection.value
      );
      const budgetLimit = this.calculateBudgetSum();
      const chargesSum = this.calculateChargeSum(selectedCostInspection.value);
      const availableBudgetMoney: OverviewCost = {
        name: "Verfügbares Budget",
        info: "Noch verfügbares Budget \n Aktuelle Budget-Abbuchungen - Budget-Limit",
        value: budgetLimit.value - chargesSum.value,
        isStaticCost: false,
      };

      const toPayMoney: OverviewCost = this.calculateToPayMoney(
        selectedCostInspection.value,
        availableBudgetMoney.value
      );
      const checkFixedCost = useSumBy(
        selectedCostInspection.value.fixedCostChecklist.filter(
          (x) => x.isChecked
        ),
        function (r) {
          return r.value;
        }
      );
      const availableMoney: OverviewCost = {
        name: "Aktuelles Geld mit aktuellen Abzügen",
        value: monthlyRevenue.value - checkFixedCost - chargesSum.value,
        info: "Aktuelles Geld welches sich aus den aktuellen abgespeichert Kosten ergibt",
        isStaticCost: false,
      };

      const { isMobil } = useUtilStore();

      if (isMobil) {
        this.overviewCosts = [
          availableMoney,
          this.getCalculatedLuxuryMoneyOverviewCost(
            monthlyRevenue.value,
            fixcostSum.value,
            chargesSum.value,
            budgetLimit.value
          ),
          toPayMoney,
          chargesSum,
          availableBudgetMoney,
          this.getLuxuryMoneyOverviewCost(
            monthlyRevenue.value,
            fixcostSum.value,
            budgetLimit.value
          ),
        ];
        return;
      }

      this.overviewCosts = [
        availableMoney,
        this.getCalculatedLuxuryMoneyOverviewCost(
          monthlyRevenue.value,
          fixcostSum.value,
          chargesSum.value,
          budgetLimit.value
        ),
        toPayMoney,
        chargesSum,
        fixcostSum,
        budgetLimit,
        monthlyRevenue,
        availableBudgetMoney,
        this.getLuxuryMoneyOverviewCost(monthlyRevenue.value, fixcostSum.value, budgetLimit.value),
      ];
    },
    calculateToPayMoney(
      costInspection: CostInspectionDto,
      availableBudgetMoney: number
    ): OverviewCost {
      const fixcostsToPay = useSumBy(
        costInspection?.fixedCostChecklist.filter((x) => !x.isChecked),
        function (f) {
          return f.value ?? 0;
        }
      );

      let budgetSpace = 0;

      costInspection.monthlyBudgets.forEach((monthlyBudget) => {
        const sum = useSumBy(monthlyBudget.charges, function (c) {
          return c.value;
        });

        if (sum < monthlyBudget.limit) {
          budgetSpace += monthlyBudget.limit - sum;
        }
      });

      return {
        name: "Maximal zu zahlende Summe",
        value: budgetSpace,
        info: "Aktuelles Geld mit noch zu zahlenden Fixkosten + verfügbares Budget",
        isStaticCost: false,
      };
    },
    calculateMonthyRevenue(costInspection: CostInspectionDto): OverviewCost {
      const revenue = useSumBy(costInspection?.credits ?? 0, function (r) {
        return r.value;
      });
      return {
        name: "Monatliches Gehalt",
        value: revenue,
        isStaticCost: true,
      };
    },
    calculateFixedCostSum(costInspection: CostInspectionDto): OverviewCost {
      const sum = useSumBy(costInspection?.fixedCostChecklist, function (f) {
        return f.value ?? 0;
      });
      return { name: "Vertragliche Kosten", value: sum, isStaticCost: true };
    },
    calculateChargeSum(costInspection: CostInspectionDto): OverviewCost {
      let sum = 0;

      if (!costInspection.monthlyBudgets)
        return {
          name: "Ausgegebenes Budget",
          value: 0,
          info: "",
          isStaticCost: false,
        };
      costInspection.monthlyBudgets.forEach((monthlyBudget) => {
        sum += useSumBy(monthlyBudget.charges, function (c) {
          return c.value;
        });
      });
      return {
        name: "Ausgegebenes Budget",
        value: sum,
        isStaticCost: false,
      };
    },
    calculateBudgetSum(): OverviewCost {
      const sum = useSumBy(useBudgetStore().budgets, function (b) {
        return b.limit;
      });
      return { name: "Budget Limit", value: sum, isStaticCost: true };
    },
    getCalculatedLuxuryMoneyOverviewCost(
      monthlyRevenue: number,
      fixcostSum: number,
      chargeSum: number,
      budgetLimit: number
    ): OverviewCost {
      let luxuryMoney = monthlyRevenue - (fixcostSum + budgetLimit);

      if (chargeSum > budgetLimit) {
        const dif = chargeSum - budgetLimit;
        luxuryMoney = luxuryMoney - dif;
      }

      const luxuryMoneyOverviewCost: OverviewCost = {
        name: "Übriges Geld",
        info: "Geld nach allen möglichen Kosten. \n Auch abzug bei Budget-Limit überzug",
        value: luxuryMoney,
        isStaticCost: false,
      };

      return luxuryMoneyOverviewCost;
    },

    getLuxuryMoneyOverviewCost(
      monthlyRevenue: number,
      fixcostSum: number,
      budgetLimit: number
    ): OverviewCost {


      const luxuryMoneyOverviewCost: OverviewCost = {
        name: "Geld für Luxus",
        info: "Geld nach allen Abzügen. \n Monatliches Gehalt - Vertragliche Kosten - Budget Limits",
        value: monthlyRevenue - (fixcostSum + budgetLimit),
        isStaticCost: true,
      };

      return luxuryMoneyOverviewCost;
    },

    async calulateCostOverview() {
      this.pieChartData = {} as ChartData;
      await this.setTotalRevenue();
      this.setFixedCostSum();
      this.setBudgetSum();
      this.setAvailibleMoney();
      this.setCostOverview();
      this.setCostPieChartData();
    },
    setFixedCostSum() {
      const { groupCosts } = useFixedCostStore();
      let fixedCostSumTemp = 0;
      groupCosts.map((groupCost, key) => {
        const groupCostSum = useSumBy(
          groupCost.fixedCosts,
          function (fixedcost: FixedCostDto) {
            return calculateMontlyChargeCost(fixedcost);
          }
        );
        fixedCostSumTemp += groupCostSum;
      });
      this.fixedCost.value = fixedCostSumTemp;
    },
    setBudgetSum() {
      const { budgets } = useBudgetStore();
      this.budgetCost.value = useSumBy(budgets, function (o: BudgetDto) {
        return o.limit;
      });
    },
    async setTotalRevenue() {
      const user = useUserStore().getUser;
      const userId = user.sub;
      if (!userId) return undefined;

      const revenues = (
        await useApiStore().RevenueClient.getRevenuesOfUserEndpoint(user.sub)
      ).revenues;
      this.totalRevenue.value = useSumBy(
        revenues,
        function (revenue: RevenueDto) {
          return revenue.value;
        }
      );
    },
    setAvailibleMoney() {
      this.availibleMoney.value = useRound(
        this.totalRevenue.value -
          (this.budgetCost.value + this.fixedCost.value),
        2
      );
    },
    setCostOverview() {
      this.overviewCosts = [];
    },
    setCostPieChartData() {
      const pieData = [this.fixedCost, this.budgetCost, this.availibleMoney];

      this.pieChartData = {
        labels: pieData.map((dataSet) => {
          return dataSet.name;
        }),
        datasets: pieData.map((dataSet) => {
          return dataSet.value;
        }),
      } as ChartData;
    },
  },
  getters: {},
});
