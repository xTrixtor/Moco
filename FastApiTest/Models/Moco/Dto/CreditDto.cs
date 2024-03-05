using Moco.Api.Models.Moco.Resource;
using MocoApi.Models.Moco.Resource;

namespace Moco.Api.Models.Moco.Dto
{
    public class CreditDto
    {
        public CreditDto()
        {
             
        }
        public CreditDto(Credit db)
        {
            this.Id = db.Id;
            this.Name = db.Name;
            this.Value = db.Value;  
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public double Value { get; set; }
    }
}
