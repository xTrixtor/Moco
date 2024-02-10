using Moco.Api.Endpoints.FixedCost;
using Moco.Api.Endpoints.GroupCost;
using Moco.Api.Endpoints.SavingGoals;
using Moco.Api.Models.Moco.Resource;
using MocoApi.Endpoints.Charge;
using MocoApi.Models.Moco.Dto;
using MocoApi.Models.Moco.Resource;

namespace MocoApi.Extensions
{
    public static class CreateDtoExtension
    {
        public static Charge Prepare(this ChargeCDto dto)
        {
            return new Charge
            {
                ChargeName = dto.ChargeName,
                Value = dto.Value,
                BudgetId = dto.BudgetId,
                CostInspectionId = dto.CostInspectionId
            };  
        }

        public static async Task<Charge> PrepareAddAsync(this ChargeCDto dto, MoCoContext moCoContext)
        {
            var charge = dto.Prepare();
            await moCoContext.Charges.AddAsync(charge);
            return charge;
        }

        public static Revenue Prepare(this RevenueDto dto)
        {
            return new Revenue
            {
                Id = dto.Id,
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

        public static SavingGoal Prepare(this SavingGoalCDto cDto, string depositsJson)
        {
            return new SavingGoal
            {
                Name = cDto.Name,
                DepositRate = cDto.DepositRate,
                DepositsJson = depositsJson,
                EndDate = cDto.EndDate,
                StartDate = cDto.StartDate,
                Value = cDto.Value,
                UserId = cDto.UserId
            };
        }

        public static async Task<SavingGoal> PrepareAddAsync(this SavingGoalCDto cDto, string depositsJson ,MoCoContext moCoContext)
        {
            var savingGoal = cDto.Prepare(depositsJson);
            await moCoContext.SavingGoals.AddAsync(savingGoal);
            return savingGoal;
        }
    }
}
