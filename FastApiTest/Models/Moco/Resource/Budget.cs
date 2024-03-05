using MocoApi.Models.Moco.Dto;

namespace MocoApi.Models.Moco.Resource
{
    public class Budget
    {
        public Budget()
        {
            
        }
        
        public int Id { get; set; }
        public required string Name { get; set; }
        public double Limit { get; set; } = 0;
        public required string UserId { get; set; }
    }
}
