using MocoApi.Models.Moco.Dto;
using MocoApi.Models.Moco.Resource;
using Microsoft.EntityFrameworkCore;

namespace MocoApi.Extensions
{
    public static class UpdateDtoExtension
    {
        public static async Task<Charge> Update(this ChargeDto dto, MoCoContext dbContext)
        {
            var target = await dbContext.Charges.FirstOrDefaultAsync(x => x.Id.Equals(dto.Id));
            if (target is null)
                throw new Exception("Charge data couldnt be found");

            if(target.ChargeName is not null) target.ChargeName = dto.ChargeName;
            if(target.Value is not 0.0) target.Value = dto.Value;

            return target;
        }

        public static async Task<Revenue> Update(this RevenueDto dto, MoCoContext dbContext)
        {
            var target = await dbContext.Revenue.FirstOrDefaultAsync(x => x.Id.Equals(dto.Id));
            if (target is null)
                throw new Exception("Revenue data couldnt be found");

            if (target.CompanyName is not null) target.CompanyName = dto.CompanyName;
            if (target.Value is not 0.0) target.Value = dto.Value;

            return target;
        }
        public static async Task<Budget> Update(this BudgetDto dto, MoCoContext dbContext)
        {
            var budget = await dbContext.Budgets.FindAsync(dto.Id);
            if (budget is null)
                throw new Exception("Budget data couldnt be found");

            if (budget.Name is not null) budget.Name = dto.Name;
            if (budget.Value is not 0.0) budget.Value = dto.Value;

            return budget;
        }

        public static async Task<Person> Update(this PersonDto dto, MoCoContext dbContext)
        {
            var person = await dbContext.Persons.FindAsync(dto.Id);
            if (person is null)
                throw new Exception("Person data couldnt be found");

            if (person.KeycloakUserId is not null) person.KeycloakUserId = dto.KeycloakUserId;
            if (person.Email is not null) person.Email = person.Email;
            if (person.Firstname is not null) person.Firstname = person.Firstname;
            if (person.LastName is not null) person.LastName = person.LastName;
            if (person.Username is not null) person.LastName = person.Username;

            return person;
        }
    }
}
