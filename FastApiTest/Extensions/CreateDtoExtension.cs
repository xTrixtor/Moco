using MocoApi.Models.Moco.Dto;
using MocoApi.Models.Moco.Resource;

namespace MocoApi.Extensions
{
    public static class CreateDtoExtension
    {
        public static Charge Prepare(this ChargeDto dto, string userId)
        {
            return new Charge
            {
                Id = dto.Id,
                ChargeName = dto.ChargeName,
                Catecory = dto.Catecory,
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

        public static Budget Prepare(this BudgetDto dto)
        {
            return new Budget
            {
                Id = dto.Id,
                Value = dto.Value,
                Name = dto.Name,
                UserId = dto.UserId
            };
        }

        public static async Task<Budget> PrepareAddAsync(this BudgetDto dto, MoCoContext moCoContext)
        {
            var revenue = dto.Prepare();
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
    }
}
