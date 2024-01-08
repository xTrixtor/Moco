
using MocoApi.Models.Moco.Resource;

namespace Moco.Api.Models.Moco.Resource
{
    public class CostInspection
    {
        public int Id { get; set; }
        public required string UserYearMonthKey { get; set; }
        public virtual ICollection<CheckableFixedCost>? CheckableFixedCosts { get; set; }
        public virtual ICollection<Charge>? BudgetCharges { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
