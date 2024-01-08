namespace Moco.Api.Models.Moco.Resource
{
    public class GroupCost
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public virtual ICollection<FixedCost>? FixedCosts { get; set; }
        public required string UserId { get; set; }
    }
}
