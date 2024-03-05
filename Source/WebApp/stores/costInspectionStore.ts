import { defineStore } from "pinia";
import { BudgetDto, ChargeDto, CostInspectionDto, MonthlyBudgetDto } from "./apiClient";
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
      if(selectedCostInspection == undefined) return sum;
      selectedCostInspection.monthlyBudgets.forEach(monthlyBudget => {
        sum += useSumBy(monthlyBudget.charges, function(c : ChargeDto){ return c.value})
      });
      return sum;
    }

    const availableMoney:number = 0;
    const fixedCostSum: number = 0;
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
      const response = await useApiStore().InspectionClient.getCostInspectionEndpoint(this.selectedDate.getFullYear(), this.selectedDate.getMonth());
      this.selectedCostInspection = response.costInspection;
      this.isUpgradeable = response.cheackableFixcostsAreUpdateable;
    }
  },
});