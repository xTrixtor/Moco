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
            Name = charge.Name;
            Value = charge.Value;
            MonthlyBudgetId = charge.MonthlyBudgetId; 
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public double Value { get; set; }
        public int MonthlyBudgetId { get; set; }
        public CostInspectionDto CostInspection { get; set; }
    }
}
