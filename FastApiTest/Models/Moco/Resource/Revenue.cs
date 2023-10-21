using System.ComponentModel.DataAnnotations;

namespace MocoApi.Models.Moco.Resource
{
    public class Revenue
    {
        public int Id { get; set; }
        [Required]
        public string CompanyName { get; set; }
        [Required]
        public double Value { get; set; }
        [Required]
        public string UserId { get; set; }
    }
}
