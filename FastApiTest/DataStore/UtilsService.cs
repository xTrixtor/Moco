using Moco.Api.Models.Moco.Dto;
using MocoApi.Models.Moco.Resource;

namespace Moco.Api.DataStore
{
    public class UtilsService
    {
        public double calculateMontlyChargeCost(FixedCostDto fixedCost)
        {
            if (fixedCost == null) return 0;

            switch (fixedCost.TimeInterval)
            {
                case TimeInterval.wöchentlich:
                    return Math.Ceiling(fixedCost.Value * 4.29 * 100) / 100;
                case TimeInterval.zweiwöchtentlich:
                    return Math.Ceiling(fixedCost.Value * 2.14 * 100) / 100;
                case TimeInterval.monatlich:
                    return Math.Ceiling(fixedCost.Value * 100) / 100;
                case TimeInterval.vierteljährlich:
                    return Math.Ceiling(fixedCost.Value / 3 * 100) / 100;
                case TimeInterval.halbjährlich:
                    return Math.Ceiling(fixedCost.Value / 6 * 100) / 100;
                case TimeInterval.jährlich:
                    return Math.Ceiling(fixedCost.Value / 12 * 100) / 100;
                default:
                    return 0;
            }
        }
    }
}
