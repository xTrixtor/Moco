using MocoApi.Models.Moco.Resource;

namespace Moco.Api.Models.Moco.Resource
{
    public class SavingGoal
    {
        public SavingGoal()
        {
                
        }
        public int Id { get; set; }
        public required string Name { get; set; }
        public required double GoalValue { get; set; }
        public required double InitialCapital { get; set; }
        public required double DepositRate { get; set; }
        public required int MethodKey { get; set; }
        public required DateTime StartDate { get; set; }
        public required DateTime EndDate { get; set; }
        public virtual ICollection<DepositRate>? DepositRates { get; set; }
        public required string UserId { get; set; }
    }
}
