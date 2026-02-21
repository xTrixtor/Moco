import { defineStore } from "pinia";
import { useBaseStore } from "./useBaseStore";
import type { Income } from "../models/Income";

export type { Income };

export const useIncomeStore = defineStore("income", () => {
  const base = useBaseStore<Income>("incomes");

  const getTotalIncome = () => {
    return base.items.value.reduce((acc, current) => acc + current.amount, 0);
  };

  return {
    ...base,
    getTotalIncome,
  };
});
