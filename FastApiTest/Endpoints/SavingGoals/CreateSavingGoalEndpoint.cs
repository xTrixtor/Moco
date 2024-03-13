using FastEndpoints;
using Moco.Api.Models.Moco.Dto;
using Moco.Api.Models.Moco.Resource;
using MocoApi.Extensions;

namespace Moco.Api.Endpoints.SavingGoals
{
    public class CreateSavingGoalEndpoint : Endpoint<SavingGoalCDto, SavingGoalDto>
    {
        public override void Configure()
        {
            Post("/savingGoals");
            Policies("User");
        }

        public async override Task HandleAsync(SavingGoalCDto req, CancellationToken ct)
        {
            using (var dbContext = new MoCoContext())
            {
                var savingGoal = await req.PrepareAddAsync(dbContext);
                dbContext.SaveChanges();

                foreach (var depositDto in req.DepositRates)
                {
                    var deposit = new DepositRate
                    {
                        Key = depositDto.Key,
                        SavingMonth = depositDto.SavingMonth,
                        Value = depositDto.Value,
                        SavingGoalId = savingGoal.Id,
                        isPaid = depositDto.isPaid,
                    };
                    dbContext.DepositRates.Add(deposit);
                }
                dbContext.SaveChanges();

                await SendAsync(savingGoal.asDto());
            }
        }   
    }

    public record SavingGoalCDto
    {
        [FromClaim("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")]
        public string UserId { get; set; }
        public required string Name { get; set; }
        public required double GoalValue { get; set; }
        public required double InitialCapital { get; set; }
        public required double DepositRate { get; set; } = 0;
        public required int MethodKey { get; set; }
        public required DepositRateDto[] DepositRates { get; set; }
        public required DateTime StartDate { get; set; }
        public required DateTime EndDate { get; set; }
    }
}
