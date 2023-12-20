using Moco.Api.Models.Moco.Dto;
using MocoApi.Models.Moco.Resource;

namespace Moco.Api.Models.Moco.Resource
{
    public class FixedCostDto
    {
        public FixedCostDto()
        {
            
        }
        public FixedCostDto(FixedCost fixedCost)
        {
            Id = fixedCost.Id;
            Name = fixedCost.Name;
            Value = fixedCost.Value;    
            GroupCostId = fixedCost.GroupCostId;
            TimeInterval = fixedCost.TimeInterval;
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public double Value { get; set; }
        public int GroupCostId { get; set; }
        public GroupCost CostGroup { get; set; }
        public TimeInterval TimeInterval { get; set; }
    }
}
