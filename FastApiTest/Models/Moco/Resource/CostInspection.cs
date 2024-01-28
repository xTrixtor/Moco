namespace MocoApi.Models.Moco.Resource
{
    public class CostInspection
    {
        public int Id { get; set; }
        public required string UserYearMonthKey { get; set; }
        public required string MonthlyFixedcostsJson { get; set; }
        public required string MonthlyCreditJson { get; set; }
        public virtual ICollection<Charge>? BudgetCharges { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
