import { defineStore } from "pinia";
import { ChargeDto } from "./apiClient";

export const useChargeStore = defineStore("charge", {
  state: () => {
    const charges = [] as ChargeDto[];

    return {
    charges,
    fetch,
    };
  },
  actions: {
  
    async fetch() {
    
    },
    
    },
  },
);
