namespace MocoApi.Models.Moco.Resource
{
    public class Budget
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public double Value { get; set; }
        public required string UserId { get; set; }
    }
}
