import { defineStore } from "pinia";
import {GroupCostDto, } from "./apiClient";
import { useApiStore } from "./apiStore";
import {createMonthlyGroupCost} from "@/utils/chargeUtils"

export const useFixedCostStore = defineStore("fixedCost", {
  state: () => {
    const groupCosts = [] as GroupCostDto[];
    const groupCostOptions = [] as GroupCostOption[];

    return {
    groupCosts,
    groupCostOptions,
 
    fetch,
    };
  },
  actions: {
    
    async fetch(): Promise<GroupCostDto[]> {
      var response = await useApiStore().FixedcostClient.getAllFixedCostsEndpoint();
      this.setGroupCostOptions(response.fixedCostGroups??[]);
      this.groupCosts = createMonthlyGroupCost(response.fixedCostGroups??[]);

      return this.groupCosts;
    },
    setGroupCostOptions(groupCosts: GroupCostDto[]) {
      this.groupCostOptions = groupCosts.map<GroupCostOption>((x) => {
        return {id: x.id, name: x.name}
      })
    }
    },
  },
);

interface GroupCostOption {
  id: number;
  name:string;
}
