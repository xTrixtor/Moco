namespace MocoApi.Models.Moco.Resource
{
    public class Budget
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public double Limit { get; set; } = 0;
        public virtual ICollection<Charge>? Charges { get; set; }
        public required string UserId { get; set; }
    }
}
