using FastEndpoints;
using Moco.Api.Models.Moco.Dto;
using MocoApi.Extensions;
using Newtonsoft.Json;

namespace Moco.Api.Endpoints.SavingGoals.Deposits
{
    public class CreateDepositRateEndpoint : Endpoint<DepositRateCDto, DepositRatelCResponse>
    {
        public override void Configure()
        {
            Post("/savingGoals/depositRate");
            Policies("User");
        }

        public async override Task HandleAsync(DepositRateCDto req, CancellationToken ct)
        {
            using (var dbContext = new MoCoContext())
            {
                var depositRate = await req.PrepareAddAsync(dbContext);
                dbContext.SaveChanges();

                await SendAsync(new DepositRatelCResponse { DepositRateDto = depositRate.asDto() });
            }
        }
    }

    public record DepositRateCDto
    {
        public int SavingGoalId { get; set; }
        public required string Key { get; set; }
        public required double Value { get; set; }
        public required DateTime SavingMonth { get; set; }
    }

        public record DepositRatelCResponse
    {
        public DepositRateDto DepositRateDto { get; set; }
    }
}
