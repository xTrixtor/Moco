import { defineStore } from "pinia";

export const useUtilStore = defineStore("util", {
  state: () => {
    const isMobil = false

    return {
    isMobil,
 
    };
  },
  actions: {
        calculateIsMobil() {
            this.isMobil = screen.width < 768
        },
    },
    getters:{
        
    }
  },
);

interface GroupCostOption {
  id: number;
  name:string;
}
