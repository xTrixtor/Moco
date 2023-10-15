using FastApiTest.Models.Moco.Dto;
using FastApiTest.Models.Moco.Resource;

namespace FastApiTest.Extensions
{
    public static class AsDtoExtension
    {
        public static ChargeDto asDto(this Charge db) => new ChargeDto(db);
        public static RevenueDto asDto(this Revenue db) => new RevenueDto(db);
    }
}
