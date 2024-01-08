using Moco.Api.Models.Moco.Dto;
using Moco.Api.Models.Moco.Resource;
using MocoApi.Extensions;
using MocoApi.Models.Moco.Resource;

namespace MocoApi.Models.Moco.Dto
{
    public class ChargeDto
    {
        public ChargeDto()
        {

        }
        public ChargeDto(Charge charge)
        {
            Id = charge.Id;
            ChargeName = charge.ChargeName;
            Value = charge.Value;
            BudgetId = charge.BudgetId; 
        }
        public int Id { get; set; }
        public string ChargeName { get; set; }
        public double Value { get; set; }
        public int BudgetId { get; set; }
        public CostInspectionDto CostInspection { get; set; }
    }
}
