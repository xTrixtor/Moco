using FastEndpoints;
using Moco.Api.Models.Moco.Dto;
using MocoApi.Extensions;

namespace Moco.Api.Endpoints.SavingGoals.Deposits
{
    public class UpdateDepositRateEndpoint : Endpoint<DepositRateUDto, DepositRatelUResponse>
    {
        public override void Configure()
        {
            Put("/savingGoals/depositRate");
            Policies("User");
        }

        public async override Task HandleAsync(DepositRateUDto req, CancellationToken ct)
        {
            using (var dbContext = new MoCoContext())
            {
                var updatedRate = await req.UpdateAsync(dbContext);
                await dbContext.SaveChangesAsync();

                await SendAsync(new DepositRatelUResponse { DepositRateDto = updatedRate.asDto()});
            }
        }
    }
    public record DepositRateUDto
    {
        public int SavingGoalId { get; set; }
        public required int Id { get; set; }
        public required string Key { get; set; }
        public required double Value { get; set; }
        public required DateTime SavingMonth { get; set; }
    }

    public record DepositRatelUResponse
    {
        public DepositRateDto DepositRateDto { get; set; }
    }
}
