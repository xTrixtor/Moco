using Moco.Api.Models.Moco.Resource;
using MocoApi.Extensions;
using Newtonsoft.Json;

namespace Moco.Api.Models.Moco.Dto
{
    public class SavingGoalDto
    {
        public SavingGoalDto()
        {
            
        }
        public SavingGoalDto(SavingGoal savingGoal)
        {
            this.Id = savingGoal.Id;
            this.Name = savingGoal.Name;
            this.GoalValue = savingGoal.GoalValue;
            this.InitialCapital = savingGoal.InitialCapital;
            this.DepositRate = savingGoal.DepositRate;
            this.EndDate = savingGoal.EndDate;
            this.StartDate   = savingGoal.StartDate;
            this.DepositRates = savingGoal?.DepositRates?.Take(10).Select(x => x.asDto()).ToArray();
            this.MethodKey = savingGoal.MethodKey;
            this.TotalRates = savingGoal.DepositRates.Count();
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public double GoalValue { get; set; }
        public double InitialCapital { get; set; }
        public double DepositRate { get; set; }
        public int MethodKey { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public DepositRateDto[]? DepositRates { get; set; }
        public int TotalRates { get; set; }
        public string UserId { get; set; }
    }
}
