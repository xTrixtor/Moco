import { defineStore } from "pinia";
import { useFixedCostStore } from "./fixedCostStore";
import { BudgetDto, FixedCostDto, RevenueDto } from "./apiClient";
import { useBudgetStore } from "./budgetStore";
import { useApiStore } from "./apiStore";

export interface OverviewCost {
  id: number;
  name: string;
  value: number;
}

export interface ChartData {
  labels: string[];
  datasets: number[];
}

export const useOverviewCostStore = defineStore("costOverview", {
  state: () => {
    const totalRevenue: OverviewCost = { id: 1, name: "Gehalt", value: 0 };
    const fixedCost: OverviewCost = { id: 2, name: "Fix Kosten", value: 0 };
    const budgetCost: OverviewCost = {
      id: 3,
      name: "Variable Kosten",
      value: 0,
    };
    const availibleMoney: OverviewCost = {
      id: 4,
      name: "Verfügbares Geld",
      value: 0,
    };

    const overviewCosts: OverviewCost[] = [];
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
      const revenues = (await useApiStore().RevenueClient.getRevenuesEndpoint())
        .revenues;
      this.totalRevenue.value = useSumBy(
        revenues,
        function (revenue: RevenueDto) {
          return revenue.value;
        }
      );
    },
    setAvailibleMoney() {
      this.availibleMoney.value = useCeil(
        this.totalRevenue.value -
          (this.budgetCost.value + this.fixedCost.value),
        2
      );
    },
    setCostOverview() {
      this.overviewCosts = [
        this.totalRevenue,
        this.fixedCost,
        this.budgetCost,
        this.availibleMoney,
      ];
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
    setSelectedOverviewCostById(id: number) {
      this.selectedOverviewCost = this.overviewCosts.filter(
        (x) => x.id === id
      )[0];
    },
  },
  getters: {},
});
