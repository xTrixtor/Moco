using MocoApi.Extensions;
using MocoApi.Models.Moco.Resource;

namespace MocoApi.Models.Moco.Dto
{
    public class BudgetDto
    {
        public BudgetDto()
        {
            
        }
        public BudgetDto(Budget budget)
        {
            Id = budget.Id;
            Name = budget.Name;
            Limit = budget.Limit;
            UserId = budget.UserId;
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public ChargeDto[]? Charges { get; set; }
        public double Limit { get; set; }
        public string UserId { get; set; }
    }
}
