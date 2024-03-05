

using MocoApi.Models.Moco.Resource;

namespace Moco.Api.Models.Moco.Resource
{
    public class DepositRate
    {
        public int Id { get; set; }
        public required string Key { get; set; }
        public required double Value { get; set; } = 0;
        public required DateTime SavingMonth { get; set; }
        public int SavingGoalId { get; set; }
        public virtual SavingGoal SavingGoal { get; set; }
    }
}
