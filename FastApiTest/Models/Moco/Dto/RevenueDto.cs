using MocoApi.Models.Moco.Resource;
using System.ComponentModel.DataAnnotations;

namespace MocoApi.Models.Moco.Dto
{
    public class RevenueDto
    {
        public RevenueDto()
        {
            
        }
        public RevenueDto(Revenue revenue)
        {
            Id = revenue.Id;
            CompanyName = revenue.CompanyName;
            Value = revenue.Value;
            UserId = revenue.UserId;
        }
        public int Id { get; set; }
        public string CompanyName { get; set; }
        public double Value { get; set; }
        public string UserId { get; set; }
    }
}
