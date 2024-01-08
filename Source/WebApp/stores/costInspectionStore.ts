import { defineStore } from "pinia";
import { BudgetDto, CostInspectionDto } from "./apiClient";
import { useApiStore } from "./apiStore";


export const useInspectionStore = defineStore("costInspection", {
  state: () => {
    const selectedDate: Date = new Date();
    const selectedCostInspection: CostInspectionDto = undefined;
    const isUpgradeable: boolean = false;
    const selectedBudget: BudgetDto = undefined;

    return {
        selectedCostInspection,
        selectedDate,
        isUpgradeable,
        selectedBudget,  

      fetch,
    };
  },
  actions: {
    async fetch() {
      this.bu
      const response = await useApiStore().InspectionClient.getCostInspectionEndpoint(this.selectedDate.getFullYear(), this.selectedDate.getMonth());
      this.selectedCostInspection = response.costInspection;
      this.isUpgradeable = response.cheackableFixcostsAreUpdateable;
    }
  },
});