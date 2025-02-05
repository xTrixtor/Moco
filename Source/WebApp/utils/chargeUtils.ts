import { FixedCostDto, GroupCostDto, TimeInterval } from "~/stores/apiClient";

export const calculateMontlyChargeCost = (fixedcost: FixedCostDto): number => {
  if (fixedcost.value === undefined) return 0;

  switch (fixedcost.timeInterval) {
    case TimeInterval.Wöchentlich:
      return useRound(fixedcost.value * 4.29, 2);
    case TimeInterval.Zweiwöchtentlich:
      return useRound(fixedcost.value * 2.14, 2);
    case TimeInterval.Monatlich:
      return useRound(fixedcost.value, 2);
    case TimeInterval.Vierteljährlich:
      return useRound(fixedcost.value / 3, 2);
    case TimeInterval.Halbjährlich:
      return useRound(fixedcost.value / 6, 2);
    case TimeInterval.Jährlich:
      return useRound(fixedcost.value / 12, 2);
    default:
      return 0;
  }
};

export const createMonthlyGroupCost = (
  groupcosts: GroupCostDto[],
): GroupCostDto[] => {
  return groupcosts.map((groupCost) => {
    const fixedCosts = groupCost.fixedCosts ?? [];
    groupCost.fixedCosts = useOrderBy(
      fixedCosts,
      function (o: FixedCostDto) {
        calculateMontlyChargeCost(o.timeInterval, o.value);
      },
      ["desc"],
    );
    return groupCost;
  });
};
