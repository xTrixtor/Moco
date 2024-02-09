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
        public double Value { get; set; } = 0;
        public required double DepositRate { get; set; } = 0;
        public required DateOnly StartDate { get; set; }
        public required DateOnly EndDate { get; set; }
        public required string DepositsJson { get; set; }
        public required string UserId { get; set; }
    }
}
