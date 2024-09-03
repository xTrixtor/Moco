import { defineStore } from "pinia";
import { BudgetDto, CBudgetRequest, ChargeDto } from "./apiClient";
import { useApiStore } from "./apiStore";

export const useBudgetStore = defineStore("budget", {
  state: () => {
    const budgets = [] as BudgetDto[];

    return {
      budgets,
      fetch,
    };
  },
  actions: {
    async addBudget(newBudget: BudgetDto) {
      const cBudgetDto = { budget: newBudget } as CBudgetRequest;
      await useApiStore().BudgetClient.createBudgetEndpoint("", cBudgetDto);
    },
    async fetch(): Promise<BudgetDto[]> {
      var response = await useApiStore().BudgetClient.getBudgetsEndpoint();
      this.budgets = useOrderBy(response.budgets, ["limit"], ["desc"]);

      return response.budgets ?? [];
    },
    setBudgets(budget: BudgetDto) {
      this.budgets = [...this.budgets, budget];
    },
  },
});
