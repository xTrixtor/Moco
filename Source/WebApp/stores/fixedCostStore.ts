import { defineStore } from "pinia";
import { FixedCostDto, GroupCostDto } from "./apiClient";
import { useApiStore } from "./apiStore";
import { createMonthlyGroupCost } from "@/utils/chargeUtils";

export const useFixedCostStore = defineStore("fixedCost", {
  state: () => {
    const groupCosts: GroupCostDto[] = [];
    const groupCostOptions: GroupCostOption[] = [];

    const selectedGroupCost: GroupCostDto = {} as GroupCostDto;

    return {
      groupCosts,
      groupCostOptions,
      selectedGroupCost,

      fetch,
    };
  },
  actions: {
    async fetch(): Promise<GroupCostDto[]> {
      var response =
        await useApiStore().FixedcostClient.getAllFixedCostsEndpoint();
      this.setGroupCostOptions(response.fixedCostGroups ?? []);
      this.groupCosts = createMonthlyGroupCost(response.fixedCostGroups ?? []);

      return this.groupCosts;
    },
    setGroupCostOptions(groupCosts: GroupCostDto[]) {
      this.groupCostOptions = groupCosts.map<GroupCostOption>((x, key) => {
        return {
          id: x.id,
          name: x.name,
          sum: useSumBy(x.fixedCosts, function (o: FixedCostDto) {
            return o.value;
          }),
        };
      });
    },
    setSelectedGroupCost(groupCost: GroupCostDto) {
      this.selectedGroupCost = groupCost;
    },
  },
});

export interface GroupCostOption {
  id: number;
  name: string;
  sum: number;
}
