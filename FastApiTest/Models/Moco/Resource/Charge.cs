using Moco.Api.Models.Moco.Resource;

namespace MocoApi.Models.Moco.Resource
{
    public class Charge
    {
        public int Id { get; set; }
        public required string ChargeName { get; set; }
        public required double Value { get; set; }
        public int BudgetId { get; set; }
        public virtual Budget Budget { get; set; }
        public int CostInspectionId { get; set; }
        public virtual CostInspection CostInspection { get; set; }
    }
}