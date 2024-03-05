using Moco.Api.Models.Moco.Resource;
using MocoApi.Extensions;
using MocoApi.Models.Moco.Dto;

namespace Moco.Api.Models.Moco.Dto
{
    public class MonthlyBudgetDto
    {
        public MonthlyBudgetDto()
        {
                
        }
        public MonthlyBudgetDto(MonthlyBudget dbo)
        {
            this.Id = dbo.Id;
            this.Name = dbo.Name;
            this.Limit = dbo.Limit;
            this.Charges = dbo.Charges.ToList().Select(x => x.asDto()).ToArray();
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public double Limit { get; set; } = 0;
        public ChargeDto[]? Charges { get; set; }
        public int CostInspectionId { get; set; }
    }
}
