using Moco.Api.Models.Moco.Dto;
using Moco.Api.Models.Moco.Resource;
using MocoApi.Models.Moco.Dto;
using MocoApi.Models.Moco.Resource;

namespace MocoApi.Extensions
{
    public static class AsDtoExtension
    {
        public static RevenueDto asDto(this Revenue db) => new RevenueDto(db);
        public static BudgetDto asDto(this Budget db) => new BudgetDto(db);
        public static FixedCostDto asDto(this FixedCost db) => new FixedCostDto(db);
        public static GroupCostDto asDto(this GroupCost db) => new GroupCostDto(db);
        public static UserDto asDto(this User db) => new UserDto(db);
        public static CostInspectionDto asDto(this CostInspection db, bool firstCreation = true) => new CostInspectionDto(db, firstCreation);
        public static MonthlyBudgetDto asDto(this MonthlyBudget db, bool firstCreation = true) => new MonthlyBudgetDto(db);
        public static ChargeDto asDto(this Charge db) => new ChargeDto(db);
        public static SavingGoalDto asDto(this SavingGoal db) => new SavingGoalDto(db);
        public static DepositRateDto asDto(this DepositRate db) => new DepositRateDto(db);
        public static CreditDto asDto(this Credit db) => new CreditDto(db);
    }
}