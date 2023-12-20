import { TimeInterval } from "~/stores/apiClient";

export const calculateMontlyChargeCost = (timeInterval: TimeInterval, cost:number): number | undefined => {
    if (cost === undefined) return 0;
  
    switch (timeInterval) {
      case TimeInterval.Wöchentlich:
        return useCeil(cost * 4.29, 2);
      case TimeInterval.Zweiwöchtentlich:
        return useCeil(cost * 2.14, 2);
      case TimeInterval.Monatlich:
        return useCeil(cost, 2);
      case TimeInterval.Vierteljährlich:
        return useCeil(cost / 4, 2);
      case TimeInterval.Halbjährlich:
        return useCeil(cost / 6, 2);
      case TimeInterval.Jährlich:
        return useCeil(cost / 12, 2);
      default:
        return 0;
    }
  };