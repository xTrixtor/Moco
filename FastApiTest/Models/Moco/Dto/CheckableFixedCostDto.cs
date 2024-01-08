using Moco.Api.Models.Moco.Resource;
using MocoApi.Extensions;

namespace Moco.Api.Models.Moco.Dto
{
    public class CheckableFixedCostDto
    {
        public CheckableFixedCostDto()
        {

        }
        public CheckableFixedCostDto(CheckableFixedCost db)
        {
            this.Id = db.Id;
            this.FixedCost = db.FixedCost.asDto();
            this.IsChecked = db.IsChecked;
            this.CreatedAt = db.CreatedAt;
        }
        public int Id { get; set; }
        public FixedCostDto FixedCost { get; set; }
        public bool IsChecked { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
