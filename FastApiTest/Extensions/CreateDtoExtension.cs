using FastApiTest.Models.Moco.Dto;
using FastApiTest.Models.Moco.Resource;

namespace FastApiTest.Extensions
{
    public static class CreateDtoExtension
    {
        public static Charge Prepare(this ChargeDto dto)
        {
            return new Charge
            {
                Id = dto.Id,
                ChargeName = dto.ChargeName,
                Catecory = dto.Catecory,
                Value = dto.Value,
                TimeInterval = dto.TimeInterval,
                UserId = dto.UserId,
            };
        }

        public static async Task<Charge> PrepareAddAsync(this ChargeDto dto, MoCoContext moCoContext)
        {
            var charge = dto.Prepare();
            await moCoContext.Charges.AddAsync(charge);
            return charge;
        }

        public static Revenue Prepare(this RevenueDto dto)
        {
            return new Revenue
            {
                CompanyName = dto.CompanyName,
                Value = dto.Value,
                UserId = dto.UserId
            };
        }

        public static async Task<Revenue> PrepareAddAsync(this RevenueDto dto, MoCoContext moCoContext)
        {
            var revenue = dto.Prepare();
            await moCoContext.Revenue.AddAsync(revenue);
            return revenue;
        }
    }
}
