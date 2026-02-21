import { defineStore } from "pinia";
import { useBaseStore } from "./useBaseStore";
import type { FixedCost } from "../models/FixedCost";

export type { FixedCost };

export const useFixedCostStore = defineStore("fixedCost", () => {
  const base = useBaseStore<FixedCost>("fixed_costs");

  const getMonthlyTotal = () => {
    return base.items.value.reduce((total, cost) => {
      // Simplistic calculation: everything is assumed monthly for now.
      // Need proper handling for YEARLY, WEEKLY etc.
      let monthlyCost = cost.amount;
      if (cost.billingInterval === "YEARLY") {
        monthlyCost = cost.amount / 12;
      } else if (cost.billingInterval === "WEEKLY") {
        monthlyCost = cost.amount * 4.33; // Average weeks in month
      }
      return total + monthlyCost;
    }, 0);
  };

  return {
    ...base,
    getMonthlyTotal,
  };
});
