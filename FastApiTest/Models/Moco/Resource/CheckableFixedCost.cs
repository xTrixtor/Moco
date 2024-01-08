namespace Moco.Api.Models.Moco.Resource
{
    public class CheckableFixedCost
    {
        public CheckableFixedCost()
        {
            
        }
        public CheckableFixedCost(FixedCost fixedCost, int costInspectionId)
        {
            this.FixedCostId = fixedCost.Id;
            this.CostInspectionId = costInspectionId;
            this.IsChecked = false;
            this.CreatedAt = DateTime.Now;
        }
        public int Id { get; set; }
        public required int FixedCostId { get; set; }
        public virtual FixedCost FixedCost { get; set; }
        public required int CostInspectionId { get; set; }
        public virtual CostInspection CostInspection { get; set; }
        public bool IsChecked { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
