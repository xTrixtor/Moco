using Moco.Api.Models.Moco.Resource;
using MocoApi.Extensions;

namespace Moco.Api.Models.Moco.Dto
{
    public class CheckableFixedCostDto
    {
        public int Key { get; set; }
        public string Name { get; set; }
        public double Value { get; set; }
        public bool IsChecked { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
