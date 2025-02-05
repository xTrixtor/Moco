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
    let requestedCostInspection: Map<string, CostInspectionDto> = new Map<
      string,
      CostInspectionDto
    >();

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
      requestedCostInspection,

      chargesSum,

      fetch,
      
    };
  },
  actions: {
    async fetch() {
      var requestedDateKey =
        this.selectedDate.getMonth() + "-" + this.selectedDate.getFullYear();

      if (this.requestedCostInspection.get(requestedDateKey) != undefined) {
        this.selectedCostInspection =
          this.requestedCostInspection.get(requestedDateKey);
        return;
      }

      this.selectedCostInspection = undefined;
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
      this.isUpgradeable = response.cheackableFixcostsAreUpdateable;

      var parts = response.costInspection.userYearMonthKey?.split("-");
      var newDateKey = `${parts[parts?.length - 1]}-${
        parts[parts?.length - 2]
      }`;
      this.requestedCostInspection.set(newDateKey, response.costInspection);
    },

    async deleteSelectedCostInspectionFetch() {
      var requestedDateKey =
        this.selectedDate.getMonth() + "-" + this.selectedDate.getFullYear();

      await useApiStore().InspectionClient.deleteCostInspectionEndpoint(
        this.selectedCostInspection.id
      );
      this.selectedCostInspection = undefined;
      this.requestedCostInspection.set(requestedDateKey, null)
    },

    async updateSelectedCostInspection(){
      const request: CheckableFixedCostUptoDateRequest = {
        costInspectionId: this.selectedCostInspection.id,
      };
      await useApiStore().InspectionClient.checkableFixedCostUptoDate(request);
      
      var requestedDateKey =
        this.selectedDate.getMonth() + "-" + this.selectedDate.getFullYear();
      this.requestedCostInspection.set(requestedDateKey, undefined);

      await this.fetch();
    }
  },
});
