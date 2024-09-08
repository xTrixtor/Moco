import { defineStore } from "pinia";
import { FixedCostDto, GroupCostDto, TimeInterval } from "./apiClient";
import { useApiStore } from "./apiStore";
import { createMonthlyGroupCost } from "@/utils/chargeUtils";

export const useFixedCostStore = defineStore("fixedCost", {
  state: () => {
    const fixedCostsByTimeInterval: {
    [key in keyof typeof TimeInterval]: FixedCostDto[]} = undefined;
    const groupCosts: GroupCostDto[] = [];
    const groupCostOptions: GroupCostOption[] = [];

    const selectedGroupCost: GroupCostDto = {} as GroupCostDto;

    return {
      groupCosts,
      groupCostOptions,
      selectedGroupCost,
      fixedCostsByTimeInterval,

      fetch,
    };
  },
  actions: {
    async fetch(): Promise<GroupCostDto[]> {
      var response =
        await useApiStore().FixedcostClient.getAllFixedCostsEndpoint();
      this.setGroupCostOptions(response.fixedCostGroups ?? []);
      this.groupCosts = createMonthlyGroupCost(response.fixedCostGroups ?? []);
      await this.setFixedCostsByInterval();

      return this.groupCosts;
    },
    async setFixedCostsByInterval() {
      var response = await useApiStore().FixedcostClient.getFixedCostsByTimeIntervalEndpoint();
      this.fixedCostsByTimeInterval = response.fixedCostsByTimeInterval;
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
