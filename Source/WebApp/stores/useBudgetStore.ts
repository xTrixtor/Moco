import { defineStore } from "pinia";
import { useBaseStore } from "./useBaseStore";
import type { Budget } from "~/models";

export const useBudgetStore = defineStore("budget", () => {
  const base = useBaseStore<Budget>("budgets");

  const getTotalBudgetLimit = () => {
    return base.items.value.reduce((acc, current) => acc + current.limit, 0);
  };

  return {
    ...base,
    getTotalBudgetLimit,
  };
});
