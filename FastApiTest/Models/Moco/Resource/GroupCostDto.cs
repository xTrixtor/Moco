using Moco.Api.Models.Moco.Dto;
using MocoApi.Extensions;
using MocoApi.Models.Moco.Dto;

namespace Moco.Api.Models.Moco.Resource
{
    public class GroupCostDto
    {
        public GroupCostDto()
        {
            
        }
        public GroupCostDto(GroupCost db)
        {
            Id = db.Id;
            Name = db.Name;
            UserId = db.UserId;
            FixedCosts = db.FixedCosts?.Select(x => x.asDto()).ToArray();
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public string UserId { get; set; }
        public FixedCostDto[]? FixedCosts { get; set; }
    }
}
