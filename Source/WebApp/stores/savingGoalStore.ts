import { defineStore } from "pinia";
import { SavingGoalDto } from "./apiClient";
import { useApiStore } from "./apiStore";

export const useSavingGoalStore = defineStore("savingGoal", {
  state: () => {
    const selectedSavingGoal: SavingGoalDto = undefined;
    const savingGoals: SavingGoalDto[] = [];

    return {
        savingGoals,
        selectedSavingGoal,

        fetch
    };
  },
  actions: {
        async fetch() {
            const response = await useApiStore().SavingGoalsClient.getAllSavingGoalsEndpoint();
            if(response.allSavingGoals){
                this.savingGoals = response.allSavingGoals;
            }
        },
        setSelectedSavingGoal(savingGoal: SavingGoalDto){
          this.selectedSavingGoal = savingGoal;
        }
    },
    getters:{
        
    }
  },
);