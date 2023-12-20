using MocoApi.Models.Moco.Resource;

namespace Moco.Api.Models.Moco.Dto
{
    public class FixedCost
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required double Value { get; set; }
        public int GroupCostId { get; set; }
        public virtual GroupCost? GroupCost { get; set; }
        public required TimeInterval TimeInterval { get; set; } = TimeInterval.monatlich;
    }
}
