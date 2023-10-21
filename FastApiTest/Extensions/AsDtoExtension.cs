using MocoApi.Models.Moco.Dto;
using MocoApi.Models.Moco.Resource;

namespace MocoApi.Extensions
{
    public static class AsDtoExtension
    {
        public static ChargeDto asDto(this Charge db) => new ChargeDto(db);
        public static RevenueDto asDto(this Revenue db) => new RevenueDto(db);
        public static BudgetDto asDto(this Budget db) => new BudgetDto(db);
        public static PersonDto asDto(this Person db) => new PersonDto(db);
    }
}
