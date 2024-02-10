using Moco.Api.Models.Moco.Resource;
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
            this.Value = savingGoal.Value;
            this.DepositRate = savingGoal.DepositRate;
            this.EndDate = savingGoal.EndDate;
            this.StartDate   = savingGoal.StartDate;
            this.DepositRates = JsonConvert.DeserializeObject<DepositRateDto[]>(savingGoal.DepositsJson);
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public double Value { get; set; } = 0;
        public double DepositRate { get; set; } = 0;
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
        public DepositRateDto[]? DepositRates { get; set; }
        public string UserId { get; set; }
    }
}
