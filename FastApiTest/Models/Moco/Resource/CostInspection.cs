using Moco.Api.Models.Moco.Resource;

namespace MocoApi.Models.Moco.Resource
{
    public class CostInspection
    {
        public int Id { get; set; }
        public required string UserYearMonthKey { get; set; }
        public required string MonthlyFixedcostsJson { get; set; }
        public virtual ICollection<MonthlyBudget>? MonthlyBudgets { get; set; }
        public virtual ICollection<Credit>? Credits { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
