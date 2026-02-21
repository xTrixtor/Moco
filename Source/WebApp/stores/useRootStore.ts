import { defineStore } from "pinia";
import { useFixedCostStore } from "./useFixedCostStore";
import { useIncomeStore } from "./useIncomeStore";
import { useBudgetStore } from "./useBudgetStore";
import { useChargeStore } from "./useChargeStore";
import { useMonthlyInspectionStore } from "./useMonthlyInspectionStore";

export const useRootStore = defineStore("root", () => {
  const fixedCostStore = useFixedCostStore();
  const incomeStore = useIncomeStore();
  const budgetStore = useBudgetStore();
  const chargeStore = useChargeStore();
  const monthlyInspectionStore = useMonthlyInspectionStore();

  const initializeAll = async () => {
    console.log("Initializing all stores from PocketBase...");
    // Fetch base lists when app starts
    await Promise.all([
      fixedCostStore.fetchAll(),
      incomeStore.fetchAll(),
      budgetStore.fetchAll(),
    ]);
  };

  return {
    fixedCostStore,
    incomeStore,
    budgetStore,
    chargeStore,
    monthlyInspectionStore,
    initializeAll,
  };
});
