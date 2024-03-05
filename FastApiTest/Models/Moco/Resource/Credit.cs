using MocoApi.Models.Moco.Resource;

namespace Moco.Api.Models.Moco.Resource
{
    public class Credit
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required double Value { get; set; }
        public int CostInspectionId { get; set; }
        public virtual CostInspection CostInspection { get; set; }
    }
}
