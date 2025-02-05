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
                    return Math.Round(fixedCost.Value * 4.29, 2) ;
                case TimeInterval.zweiwöchtentlich:
                    return Math.Round(fixedCost.Value * 2.14, 2);
                case TimeInterval.monatlich:
                    return Math.Round(fixedCost.Value, 2);
                case TimeInterval.vierteljährlich:
                    return Math.Round(fixedCost.Value / 3, 2);
                case TimeInterval.halbjährlich:
                    return Math.Round(fixedCost.Value / 6, 2);
                case TimeInterval.jährlich:
                    return Math.Round(fixedCost.Value / 12, 2);
                default:
                    return 0;
            }
        }
    }
}
