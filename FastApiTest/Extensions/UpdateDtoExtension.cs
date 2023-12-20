using MocoApi.Models.Moco.Dto;
using MocoApi.Models.Moco.Resource;
using Microsoft.EntityFrameworkCore;
using Moco.Api.Models.Moco.Dto;
using Moco.Api.Models.Moco.Resource;
using Moco.Api.Endpoints.GroupCost;
using Moco.Api.Endpoints.FixedCost;

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
            if (budget.Limit is not 0.0) budget.Limit = dto.Limit;

            return budget;
        }

        public static async Task<Person> Update(this PersonDto dto, MoCoContext dbContext)
        {
            var person = await dbContext.Persons.FindAsync(dto.Id);
            if (person is null)
                throw new Exception("Person data couldnt be found");

            if (person.KeycloakUserId is not null) person.KeycloakUserId = dto.KeycloakUserId;
            if (person.Email is not null) person.Email = dto.Email;
            if (person.Firstname is not null) person.Firstname = dto.Firstname;
            if (person.LastName is not null) person.LastName = dto.LastName;
            if (person.Username is not null) person.LastName = dto.Username;

            return person;
        }

        public static async Task<FixedCost> Update(this FixedCostUDto uDto, MoCoContext dbContext)
        {
            var selectedFixedCost = await dbContext.FixedCosts.FindAsync(uDto.Id);
            if (selectedFixedCost is null)
                throw new Exception("FixedCost data couldnt be found");

            if (selectedFixedCost.GroupCostId is not 0) selectedFixedCost.GroupCostId = uDto.GroupCostId;
            if (selectedFixedCost.Name is not null) selectedFixedCost.Name = uDto.Name;
            if (selectedFixedCost.Value is not 0.0) selectedFixedCost.Value = uDto.Value;
            if (selectedFixedCost.TimeInterval is not 0) selectedFixedCost.TimeInterval = uDto.TimeInterval;

            return selectedFixedCost;
        }

        public static async Task<GroupCost> Update(this GroupCostUDto uDto, MoCoContext dbContext)
        {
            var selectedGroupCost = await dbContext.GroupCosts.FindAsync(uDto.Id);
            if (selectedGroupCost is null)
                throw new Exception("CostGroup data couldnt be found");

            if (selectedGroupCost.Name is not null) selectedGroupCost.Name = uDto.Name;

            return selectedGroupCost;
        }
    }
}
