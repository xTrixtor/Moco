using MocoApi.Models.Moco.Resource;
using System.Runtime.CompilerServices;

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
            Value = budget.Value;
            UserId = budget.UserId;
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public double Value { get; set; }
        public string UserId { get; set; }
    }
}
