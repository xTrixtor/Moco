using Moco.Api.Endpoints.Credit;
using Moco.Api.Endpoints.FixedCost;
using Moco.Api.Endpoints.GroupCost;
using Moco.Api.Endpoints.SavingGoals;
using Moco.Api.Endpoints.SavingGoals.Deposits;
using Moco.Api.Models.Moco.Resource;
using MocoApi.Endpoints.Charge;
using MocoApi.Models.Moco.Dto;
using MocoApi.Models.Moco.Resource;
using Newtonsoft.Json;

namespace MocoApi.Extensions
{
    public static class CreateDtoExtension
    {
        public static Charge Prepare(this ChargeCDto dto)
        {
            return new Charge
            {
                Name = dto.Name,
                Value = dto.Value,
                MonthlyBudgetId = dto.MonthlyBudgetId,
            };  
        }

        public static async Task<Charge> PrepareAddAsync(this ChargeCDto dto, MoCoContext moCoContext)
        {
            var charge = dto.Prepare();
            await moCoContext.Charges.AddAsync(charge);
            return charge;
        }

        public static Revenue Prepare(this RevenueDto dto, string userId)
        {
            return new Revenue
            {
                Source = dto.Source,
                Value = dto.Value,
                UserId = userId
            };
        }

        public static async Task<Revenue> PrepareAddAsync(this RevenueDto dto, MoCoContext moCoContext, string userId)
        {
            var revenue = dto.Prepare(userId);
            await moCoContext.Revenue.AddAsync(revenue);
            return revenue;
        }

        public static Budget Prepare(this BudgetDto dto, string userId)
        {
            return new Budget
            {
                Id = dto.Id,
                Limit = dto.Limit,
                Name = dto.Name,
                UserId = userId
            };
        }

        public static async Task<Budget> PrepareAddAsync(this BudgetDto dto, MoCoContext moCoContext, string userId)
        {
            var revenue = dto.Prepare(userId);
            await moCoContext.Budgets.AddAsync(revenue);
            return revenue;
        }

        public static User Prepare(this UserDto dto)
        {
            return new User
            {
                Id = dto.Id,
                Email = dto.Email,
                Firstname = dto.Firstname,
                LastName = dto.LastName,
                Username = dto.Username,
                CreatedAt = dto.CreatedAt,  
                KeycloakUserId = dto.KeycloakUserId 
            };
        }

        public static async Task<User> PrepareAddAsync(this UserDto dto, MoCoContext moCoContext)
        {
            var person = dto.Prepare();
            await moCoContext.Users.AddAsync(person);
            return person;
        }

        public static FixedCost Prepare(this CreateFixedCDto dto)
        {
            return new FixedCost
            {
                Name = dto.Name,
                Value = dto.Value,
                TimeInterval = dto.TimeInterval,
                GroupCostId = dto.GroupCostId,
            };
        }

        public static async Task<FixedCost> PrepareAddAsync(this CreateFixedCDto cdto, MoCoContext moCoContext)
        {
            var fixedCost = cdto.Prepare();
            await moCoContext.FixedCosts.AddAsync(fixedCost);
            return fixedCost;
        }

        public static GroupCost Prepare(this GroupCostCDto dto)
        {
            return new GroupCost
            {
                Name = dto.Name,
                UserId = dto.UserId
            };
        }

        public static async Task<GroupCost> PrepareAddAsync(this GroupCostCDto dto, MoCoContext moCoContext)
        {
            var groupCost = dto.Prepare();
            await moCoContext.GroupCosts.AddAsync(groupCost);
            return groupCost;
        }

        public static SavingGoal Prepare(this SavingGoalCDto cDto)
        {
            return new SavingGoal
            {
                Name = cDto.Name,
                DepositRate = cDto.DepositRate,
                EndDate = cDto.EndDate,
                StartDate = cDto.StartDate,
                GoalValue = cDto.GoalValue,
                InitialCapital = cDto.InitialCapital,
                UserId = cDto.UserId,
                MethodKey = cDto.MethodKey
            };
        }

        public static async Task<SavingGoal> PrepareAddAsync(this SavingGoalCDto cDto ,MoCoContext moCoContext)
        {
            var savingGoal = cDto.Prepare();
            await moCoContext.SavingGoals.AddAsync(savingGoal);
            return savingGoal;
        }

        public static DepositRate Prepare(this DepositRateCDto cDto)
        {
            return new DepositRate
            {
                Key = cDto.Key,
                SavingMonth = cDto.SavingMonth,
                Value = cDto.Value,
                isPaid = cDto.isPaid
            };
        }

        public static async Task<DepositRate> PrepareAddAsync(this DepositRateCDto cDto, MoCoContext moCoContext)
        {
            var depositRate = cDto.Prepare();
            await moCoContext.DepositRates.AddAsync(depositRate);
            return depositRate;
        }

        public static Credit Prepare(this CreditCDto cDto)
        {
            return new Credit
            {
                Name = cDto.Name,
                Value = cDto.Value,
                CostInspectionId = cDto.CostInspectionId,
            };
        }

        public static async Task<Credit> PrepareAddAsync(this CreditCDto cDto, MoCoContext moCoContext)
        {
            var credit = cDto.Prepare();
            await moCoContext.Credits.AddAsync(credit);
            return credit;
        }
    }
}
