import { FixedCostDto, GroupCostDto, TimeInterval } from "~/stores/apiClient";

export const calculateMontlyChargeCost = (fixedcost:FixedCostDto): number  => {
    if (fixedcost.value === undefined) return 0;
  
    switch (fixedcost.timeInterval) {
      case TimeInterval.Wöchentlich:
        return useCeil(fixedcost.value * 4.29, 2);
      case TimeInterval.Zweiwöchtentlich:
        return useCeil(fixedcost.value * 2.14, 2);
      case TimeInterval.Monatlich:
        return useCeil(fixedcost.value, 2);
      case TimeInterval.Vierteljährlich:
        return useCeil(fixedcost.value / 3, 2);
      case TimeInterval.Halbjährlich:
        return useCeil(fixedcost.value / 6, 2);
      case TimeInterval.Jährlich:
        return useCeil(fixedcost.value / 12, 2);
      default:
        return 0;
    }
  };

  export const reverseMonthlyCostIntoOrigin = (timeInterval: TimeInterval, cost:number): number  => {
    if (cost === undefined) return 0;
    
    switch (timeInterval) {
      case TimeInterval.Wöchentlich:
        return useFloor(cost / 4.29);
      case TimeInterval.Zweiwöchtentlich:
        return useFloor(cost);
      case TimeInterval.Monatlich:
        return cost;
      case TimeInterval.Vierteljährlich:
        return useFloor(cost * 3);
      case TimeInterval.Halbjährlich:
        return useFloor(cost * 6);
      case TimeInterval.Jährlich:
        return useFloor(cost * 12);
      default:
        return 0;
    }
  };

  export const createMonthlyGroupCost = (groupcosts:GroupCostDto[]): GroupCostDto[] => {

    return groupcosts.map(groupCost => {
      const fixedCosts = groupCost.fixedCosts??[]
      groupCost.fixedCosts = useOrderBy(fixedCosts,function(o:FixedCostDto){calculateMontlyChargeCost(o.timeInterval, o.value)} ,["desc"])
      return groupCost; 
    });
    }

