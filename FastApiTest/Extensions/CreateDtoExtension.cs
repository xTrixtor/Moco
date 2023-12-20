using Moco.Api.Endpoints.FixedCost;
using Moco.Api.Endpoints.GroupCost;
using Moco.Api.Models.Moco.Dto;
using Moco.Api.Models.Moco.Resource;
using MocoApi.Models.Moco.Dto;
using MocoApi.Models.Moco.Resource;

namespace MocoApi.Extensions
{
    public static class CreateDtoExtension
    {
        public static Charge Prepare(this ChargeDto dto, string userId)
        {
            return new  Charge
            {
                Id = dto.Id,
                ChargeName = dto.ChargeName,
                BudgetId = dto.BudgetId,
                Value = dto.Value,
                TimeInterval = dto.TimeInterval,
                UserId = userId,
            };
        }

        public static async Task<Charge> PrepareAddAsync(this ChargeDto dto, MoCoContext moCoContext, string userId)
        {
            var charge = dto.Prepare(userId);
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

        public static Person Prepare(this PersonDto dto)
        {
            return new Person
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

        public static async Task<Person> PrepareAddAsync(this PersonDto dto, MoCoContext moCoContext)
        {
            var person = dto.Prepare();
            await moCoContext.Persons.AddAsync(person);
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
    }
}
