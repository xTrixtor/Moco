using Moco.Api.Models.Moco.Resource;

namespace MocoApi.Models.Moco.Resource
{
    public class Charge
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required double Value { get; set; }
        public int MonthlyBudgetId { get; set; }
        public virtual MonthlyBudget MonthlyBudget { get; set; }
    }
}