import { defineStore } from "pinia";
import {
  BudgetDto,
  ChargeDto,
  CheckableFixedCostUptoDateRequest,
  CostInspectionDto,
  MonthlyBudgetDto,
} from "./apiClient";
import { useApiStore } from "./apiStore";

export const useInspectionStore = defineStore("costInspection", {
  state: () => {
    const selectedDate: Date = new Date();
    const selectedCostInspection: CostInspectionDto = undefined;
    const isUpgradeable: boolean = false;
    const selectedBudget: BudgetDto = undefined;
    const selectedMonthlyBudget: MonthlyBudgetDto = undefined;

    const calculateCharges = (): number => {
      let sum = 0;
      if (selectedCostInspection == undefined) return sum;
      selectedCostInspection.monthlyBudgets.forEach((monthlyBudget) => {
        sum += useSumBy(monthlyBudget.charges, function (c: ChargeDto) {
          return c.value;
        });
      });
      return sum;
    };

    const chargesSum = calculateCharges();

    return {
      selectedCostInspection,
      selectedDate,
      isUpgradeable,
      selectedBudget,
      selectedMontlyBudget: selectedMonthlyBudget,

      chargesSum,

      fetch,
    };
  },
  actions: {
    async fetch() {
      const response =
        await useApiStore().InspectionClient.getCostInspectionEndpoint(
          this.selectedDate.getFullYear(),
          this.selectedDate.getMonth()
        );
      if (!response.costInspection) {
        this.selectedCostInspection = null;
        return;
      }
      this.selectedCostInspection = response.costInspection;
    },

    async deleteSelectedCostInspectionFetch() {
      var requestedDateKey =
        this.selectedDate.getMonth() + "-" + this.selectedDate.getFullYear();

      await useApiStore().InspectionClient.deleteCostInspectionEndpoint(
        this.selectedCostInspection.id
      );
      this.selectedCostInspection = undefined;
    },

    async updateSelectedCostInspection() {
      const request: CheckableFixedCostUptoDateRequest = {
        costInspectionId: this.selectedCostInspection.id,
      };
      await useApiStore().InspectionClient.checkableFixedCostUptoDate(request);

      var requestedDateKey =
        this.selectedDate.getMonth() + "-" + this.selectedDate.getFullYear();

      await this.fetch();
    },
  },
});
