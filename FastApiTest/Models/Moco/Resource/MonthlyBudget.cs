using MocoApi.Models.Moco.Resource;

namespace Moco.Api.Models.Moco.Resource
{
    public class MonthlyBudget
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public double Limit { get; set; } = 0;
        public virtual ICollection<Charge>? Charges { get; set; }
        public int CostInspectionId { get; set; }
        public virtual CostInspection? CostInspection { get; set; }
    }
}
