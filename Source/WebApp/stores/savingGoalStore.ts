import { defineStore } from "pinia";
import { SavingGoalDto, SavingGoalOption } from "./apiClient";
import { useApiStore } from "./apiStore";

export const useSavingGoalStore = defineStore("savingGoal", {
  state: () => {
    const selectedSavingGoal: SavingGoalDto | undefined = { id: undefined };
    const savingGoals: SavingGoalOption[] = [];

    return {
      savingGoals,
      selectedSavingGoal,

      fetch,
    };
  },
  actions: {
    async fetch() {
      const response =
        await useApiStore().SavingGoalsClient.getAllSavingGoalsEndpoint();
      if (response.savingGoalOptions) {
        this.savingGoals = response.savingGoalOptions;
      }
    },
    setSelectedSavingGoal(savingGoal: SavingGoalDto) {
      this.selectedSavingGoal = savingGoal;
    },
  },
  getters: {},
});
