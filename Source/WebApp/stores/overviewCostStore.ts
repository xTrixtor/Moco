import { defineStore, storeToRefs } from "pinia";
import { useFixedCostStore } from "./fixedCostStore";
import {
  BudgetDto,
  CostInspectionDto,
  FixedCostDto,
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
}

export interface ChartData {
  labels: string[];
  datasets: number[];
}

export const useOverviewCostStore = defineStore("costOverview", {
  state: () => {
    const overviewCosts: OverviewCost[] = [];
    const totalRevenue: OverviewCost = { name: "Gehalt", value: 0 };
    const fixedCost: OverviewCost = { name: "Fix Kosten", value: 0, info: "" };
    const budgetCost: OverviewCost = {
      name: "Variable Kosten",
      value: 0,
      info: undefined,
    };
    const availibleMoney: OverviewCost = {
      name: "Aktuelles Geld mit Abzügen",
      value: 0,
      info: "Gehalt minus alle Kosten welche gespeichert wurden",
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
        selectedCostInspection.value,
      );
      const fixcostSum = this.calculateFixedCostSum(
        selectedCostInspection.value,
      );
      const budgetLimit = this.calculateBudgetSum();
      const chargesSum = this.calculateChargeSum(selectedCostInspection.value);
      const currentMoney: OverviewCost = {
        name: "Geld für Luxus",
        info: "Geld nach allen Abzügen. \n Monatliches Gehalt - Vertragliche Kosten - Budget Limits",
        value: monthlyRevenue.value - (fixcostSum.value + budgetLimit.value),
      };
      const toPayMoney: OverviewCost = this.calculateToPayMoney(
        selectedCostInspection.value,
        budgetLimit.value
      );
      const checkFixedCost = useSumBy(
        selectedCostInspection.value.fixedCostChecklist.filter(
          (x) => x.isChecked,
        ),
        function (r) {
          return r.value;
        },
      );
      const availableMoney: OverviewCost = {
        name: "Aktuelles Geld mit aktuellen Abzügen",
        value: monthlyRevenue.value - checkFixedCost - chargesSum.value,
        info: "Aktuelles Geld welches sich aus den aktuellen abgespeichert Kosten ergibt",
      };

      const luxaryMoney: OverviewCost = {
        name: "Verfügbares Einkommen",
        value: monthlyRevenue.value - budgetLimit.value - fixcostSum.value,
        info: "Geld minus alle abgespeicherten Kosten",
      };
      const { isMobil } = useUtilStore();

      if(isMobil){
        this.overviewCosts = [
          availableMoney,
          currentMoney,
          toPayMoney,
          chargesSum,
        ];
        return;
      }

      this.overviewCosts = [
        availableMoney,
        currentMoney,
        toPayMoney,
        chargesSum,
        luxaryMoney,
        fixcostSum,
        budgetLimit,
        monthlyRevenue,
      ];
    },
    calculateToPayMoney(costInspection: CostInspectionDto, budgetSum: number): OverviewCost {
      const fixcostsToPay = useSumBy(
        costInspection?.fixedCostChecklist.filter((x) => !x.isChecked),
        function (f) {
          return f.value ?? 0;
        },
      );
      return { name: "Maximal zu zahlende Summe", value: fixcostsToPay + budgetSum, info: "Aktuelles Geld mit noch zu zahlenden Fixkosten + verfügbares Budget" };
    },
    calculateMonthyRevenue(costInspection: CostInspectionDto): OverviewCost {
      const revenue = useSumBy(costInspection?.credits ?? 0, function (r) {
        return r.value;
      });
      return { name: "Monatliches Gehalt", value: revenue, info: "" };
    },
    calculateFixedCostSum(costInspection: CostInspectionDto): OverviewCost {
      const sum = useSumBy(costInspection?.fixedCostChecklist, function (f) {
        return f.value ?? 0;
      });
      return { name: "Vertragliche Kosten", value: sum };
    },
    calculateChargeSum(costInspection: CostInspectionDto): OverviewCost {
      let sum = 0;

      if (!costInspection.monthlyBudgets)
        return { name: "Ausgegebenes Budget", value: 0, info: "" };
      costInspection.monthlyBudgets.forEach((monthlyBudget) => {
        sum += useSumBy(monthlyBudget.charges, function (c) {
          return c.value;
        });
      });
      return { name: "Ausgegebene Budget", value: sum };
    },
    calculateBudgetSum(): OverviewCost {
      const sum = useSumBy(useBudgetStore().budgets, function (b) {
        return b.limit;
      });
      return { name: "Budget Limit", value: sum };
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
      if(!userId) return undefined;

      const revenues = (await useApiStore().RevenueClient.getRevenuesOfUserEndpoint(user.sub))
        .revenues;
      this.totalRevenue.value = useSumBy(
        revenues,
        function (revenue: RevenueDto) {
          return revenue.value;
        },
      );
    },
    setAvailibleMoney() {
      this.availibleMoney.value = useCeil(
        this.totalRevenue.value -
          (this.budgetCost.value + this.fixedCost.value),
        2,
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
