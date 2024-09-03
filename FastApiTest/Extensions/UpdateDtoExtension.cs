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
using Moco.Api.Endpoints.SavingGoals.Deposits;
using Moco.Api.Endpoints.Credit;
using Moco.Api.Endpoints.CostInspection.MonthlyBudget;

namespace MocoApi.Extensions
{
    public static class UpdateDtoExtension
    {
        public static async Task<MonthlyBudget> Update(this MonthlyBudgetUDto uDto, MoCoContext dbContext)
        {
            var target = await dbContext.MonthlyBudgets.FirstOrDefaultAsync(x => x.Id.Equals(uDto.MonthlyBudgetId));
            if (target is null)
                throw new Exception("Charge data couldnt be found");

            if (uDto.Name is not null) target.Name = uDto.Name;
            if (uDto.Limit is not 0.0) target.Limit = uDto.Limit;

            return target;
        }

        public static async Task<Charge> Update(this ChargeUDto uDto, MoCoContext dbContext)
        {
            var target = await dbContext.Charges.FirstOrDefaultAsync(x => x.Id.Equals(uDto.Id));
            if (target is null)
                throw new Exception("Charge data couldnt be found");

            if (uDto.MonthlyBudgetId is not 0) target.MonthlyBudgetId = uDto.MonthlyBudgetId;
            if (uDto.Name is not null) target.Name = uDto.Name;
            if (uDto.Value is not 0.0) target.Value = uDto.Value;

            return target;
        }

        public static async Task<Revenue> Update(this RevenueDto dto, MoCoContext dbContext)
        {
            var target = await dbContext.Revenue.FirstOrDefaultAsync(x => x.Id.Equals(dto.Id));
            if (target is null)
                throw new Exception("Revenue data couldnt be found");

            if (dto.Source is not null) target.Source = dto.Source;
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
                throw new Exception("Cost Inspection data couldnt be found");

            var dto = selectedCostInspection.asDto();
            dto.FixedCostChecklist.First(x => x.Key == uDto.CheckableFixcostKey).IsChecked = uDto.IsChecked;
            selectedCostInspection.MonthlyFixedcostsJson = JsonConvert.SerializeObject(dto.FixedCostChecklist);

        }

        public static async Task<DepositRate> UpdateAsync(this DepositRateUDto uDto, MoCoContext dbContext)
        {
            var selectedDepositRate = await dbContext.DepositRates.FirstOrDefaultAsync(x => x.Id == uDto.Id);
            if (selectedDepositRate is null)
                throw new Exception("DepositRate data couldnt be found");

            if (selectedDepositRate.Value is not 0.0) selectedDepositRate.Value = uDto.Value;

            return selectedDepositRate;
        }
        public static async Task AddOrUpdate(this DepositRateDto dto, int goalId, MoCoContext dbContext)
        {
            var selectedDepositRate = await dbContext.DepositRates.FirstOrDefaultAsync(x => x.Key == dto.Key);
            if (selectedDepositRate is null)
            {
                var newDepositRate = new DepositRate
                {
                    Key = dto.Key,
                    SavingMonth = dto.SavingMonth,
                    Value = dto.Value,
                    isPaid = dto.isPaid,
                    SavingGoalId = goalId,
                };
                await dbContext.DepositRates.AddAsync(newDepositRate);
            }
            else
            {
                if (selectedDepositRate.Value is not 0.0) selectedDepositRate.Value = dto.Value;
                selectedDepositRate.isPaid = dto.isPaid;    

            }
        }

        public static CheckableFixedCostDto toCheckable(this FixedCostDto fixedCost, int key)
        {
            return new CheckableFixedCostDto { Key = key, Name = fixedCost.Name, Value = fixedCost.Value, IsChecked = false, CreatedAt = DateTime.Now };
        }

        public static async Task<Credit> UpdateAsync(this CreditUDto uDto, MoCoContext dbContext)
        {
            var selectedCredit = await dbContext.Credits.FirstOrDefaultAsync(x => x.Id == uDto.Id);
            if (selectedCredit is null)
                throw new Exception("DepositRate data couldnt be found");

            if (selectedCredit.Name is not null) selectedCredit.Name = uDto.Name;
            if (selectedCredit.Value is not 0.0) selectedCredit.Value = uDto.Value;

            return selectedCredit;
        }
    }
}
