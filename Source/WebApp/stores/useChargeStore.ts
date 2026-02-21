import { defineStore } from "pinia";
import { useBaseStore, pb } from "./useBaseStore";
import type { Charge } from "~/models";

export const useChargeStore = defineStore("charge", () => {
  const base = useBaseStore<Charge>("charges");

  const getChargesForBudget = async (budgetId: string) => {
    return await pb.collection("charges").getFullList<Charge>({
      filter: `budgetId = "${budgetId}"`,
      sort: "-date",
    });
  };

  return {
    ...base,
    getChargesForBudget,
  };
});
