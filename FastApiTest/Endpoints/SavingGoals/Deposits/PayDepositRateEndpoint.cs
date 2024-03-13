using FastEndpoints;
using Microsoft.EntityFrameworkCore;
using Moco.Api.Models.Moco.Dto;
using MocoApi.Extensions;

namespace Moco.Api.Endpoints.SavingGoals.Deposits
{
    public class PayDepositRateEndpoint : Endpoint<PayDepositRateDto, DepositRateDto>
    {
        public override void Configure()
        {
            Put("/savingGoals/depositRate/pay");
            Policies("User");
        }

        public async override Task HandleAsync(PayDepositRateDto req, CancellationToken ct)
        {
            using (var dbContext = new MoCoContext())
            {
                var selectedDepositRate = await dbContext.DepositRates.FirstOrDefaultAsync(x => x.Id == req.Id && x.SavingGoal.Id == req.SavingGoalId);
                selectedDepositRate.isPaid = true;

                await dbContext.SaveChangesAsync();

                await SendAsync(selectedDepositRate.asDto());
            }
        }
    }

    public record PayDepositRateDto
    {
        public int SavingGoalId { get; set; }
        public required int Id { get; set; }
    }

}
