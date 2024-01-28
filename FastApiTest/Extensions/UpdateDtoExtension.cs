using MocoApi.Models.Moco.Dto;
using MocoApi.Models.Moco.Resource;
using Microsoft.EntityFrameworkCore;
using Moco.Api.Models.Moco.Resource;
using Moco.Api.Endpoints.GroupCost;
using Moco.Api.Endpoints.FixedCost;
using MocoApi.Endpoints.Charge;
using Moco.Api.Endpoints.CostInspection;
using System.Runtime.CompilerServices;
using Moco.Api.Models.Moco.Dto;
using Newtonsoft.Json;

namespace MocoApi.Extensions
{
    public static class UpdateDtoExtension
    {
        public static async Task<Charge> Update(this ChargeUDto uDto, MoCoContext dbContext)
        {
            var target = await dbContext.Charges.FirstOrDefaultAsync(x => x.Id.Equals(uDto.Id));
            if (target is null)
                throw new Exception("Charge data couldnt be found");

            if(uDto.BudgetId is not 0) target.BudgetId = uDto.BudgetId;
            if(uDto.CostInspectionId is not 0) target.CostInspectionId = uDto.CostInspectionId;
            if(uDto.ChargeName is not null) target.ChargeName = uDto.ChargeName;
            if(uDto.Value is not 0.0) target.Value = uDto.Value;

            return target;
        }

        public static async Task<Revenue> Update(this RevenueDto dto, MoCoContext dbContext)
        {
            var target = await dbContext.Revenue.FirstOrDefaultAsync(x => x.Id.Equals(dto.Id));
            if (target is null)
                throw new Exception("Revenue data couldnt be found");

            if (dto.CompanyName is not null) target.CompanyName = dto.CompanyName;
            if (dto.Value is not 0.0) target.Value = dto.Value;

            return target;
        }
        public static async Task<Budget> Update(this BudgetDto dto, MoCoContext dbContext)
        {
            var budget = await dbContext.Budgets.FindAsync(dto.Id);
            if (budget is null)
                throw new Exception("Budget data couldnt be found");

            if (dto.Name is not null) budget.Name = dto.Name;
            if (dto.Limit is not 0.0) budget.Limit = dto.Limit;

            return budget;
        }

        public static async Task<User> Update(this UserDto dto, MoCoContext dbContext)
        {
            var person = await dbContext.Users.FindAsync(dto.Id);
            if (person is null)
                throw new Exception("Person data couldnt be found");

            if (dto.KeycloakUserId is not null) person.KeycloakUserId = dto.KeycloakUserId;
            if (dto.Email is not null) person.Email = dto.Email;
            if (dto.Firstname is not null) person.Firstname = dto.Firstname;
            if (dto.LastName is not null) person.LastName = dto.LastName;
            if (dto.Username is not null) person.LastName = dto.Username;

            return person;
        }

        public static async Task<FixedCost> Update(this FixedCostUDto uDto, MoCoContext dbContext)
        {
            var selectedFixedCost = await dbContext.FixedCosts.FindAsync(uDto.Id);
            if (selectedFixedCost is null)
                throw new Exception("FixedCost data couldnt be found");

            if (uDto.GroupCostId is not 0) selectedFixedCost.GroupCostId = uDto.GroupCostId;
            if (uDto.Name is not null) selectedFixedCost.Name = uDto.Name;
            if (uDto.Value is not 0.0) selectedFixedCost.Value = uDto.Value;
            if (uDto.TimeInterval is not 0) selectedFixedCost.TimeInterval = uDto.TimeInterval;

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
        public static async Task UpdateAsync(this CheckableFixedCostUDto uDto, MoCoContext dbContext)
        {
            var selectedCostInspection = await dbContext.CostInspections.FirstOrDefaultAsync(x => x.Id == uDto.CostInspectionId);
            if (selectedCostInspection is null)
                throw new Exception("Checkable FC data couldnt be found");

            var dto = selectedCostInspection.asDto();
            dto.FixedCostChecklist.First(x => x.Key == uDto.CheckableFixcostKey).IsChecked = uDto.IsChecked;
            selectedCostInspection.MonthlyFixedcostsJson = JsonConvert.SerializeObject(dto.FixedCostChecklist);

        }

        public static CheckableFixedCostDto toCheckable(this FixedCostDto fixedCost, int key)
        {
            return new CheckableFixedCostDto { Key = key, Name = fixedCost.Name, Value = fixedCost.Value, IsChecked = false, CreatedAt = DateTime.Now };
        }
    }
}
