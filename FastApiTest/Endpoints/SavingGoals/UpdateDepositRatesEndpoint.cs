using FastEndpoints;
using Microsoft.EntityFrameworkCore;
using Moco.Api.Endpoints.SavingGoals.Deposits;
using Moco.Api.Models.Moco.Dto;
using Moco.Api.Models.Moco.Resource;
using MocoApi.Extensions;

namespace Moco.Api.Endpoints.SavingGoals
{
    public class UpdateDepositRatesEndpoint : Endpoint<UpdateDepositRatesRequest, UpdateDepositRatesResponse> 
    {
        public override void Configure()
        {
            Get("/savingGoals/updateRates");
            Policies("User");
        }

        public async override Task HandleAsync(UpdateDepositRatesRequest req, CancellationToken ct)
        {
            using (var dbContext = new MoCoContext())
            {
                var savingGoal = await dbContext.DepositRates.FirstOrDefaultAsync(x => x.SavingGoalId == req.SavingGoalId);

                var lastRate = req.UpdatedDepositRates.LastOrDefault();

                foreach (var rateUdto in req.UpdatedDepositRates)
                {
                    await rateUdto.UpdateAsync(dbContext);
                }

                await SendAsync(new UpdateDepositRatesResponse { SavingGoal = { } });

            }
        }
    }
    public record UpdateDepositRatesRequest
    {
        [FromClaim("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")]
        public string UserId { get; set; }
        public required int SavingGoalId { get; set; }
        public DepositRateUDto[] UpdatedDepositRates { get; set; }
    }
    public record UpdateDepositRatesResponse
    {
        public SavingGoalDto SavingGoal { get; set; }
    }
}
