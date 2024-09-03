using Moco.Api.Models.Moco.Resource;
using MocoApi.Extensions;

namespace Moco.Api.Models.Moco.Dto
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
            FixedCosts = db.FixedCosts.ToList().Select(x => x.asDto()).ToArray();
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public string UserId { get; set; }
        public FixedCostDto[]? FixedCosts { get; set; }
    }
}
