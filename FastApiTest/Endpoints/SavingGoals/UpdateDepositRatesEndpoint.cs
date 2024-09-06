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
            Put("/savingGoals/updateRates");
            Policies("User");
        }

        public async override Task HandleAsync(UpdateDepositRatesRequest req, CancellationToken ct)
        {
            using (var dbContext = new MoCoContext())
            {
                var depositRates = dbContext.DepositRates.Where(x => x.SavingGoalId == req.SavingGoalId).ToList();

                foreach (var rateUdto in req.UpdatedDepositRates)
                {
                    await rateUdto.AddOrUpdate(req.SavingGoalId, dbContext);
                }

                if(req.UpdatedDepositRates.Count() < depositRates.Count())
                {
                    var lastNewRate = req.UpdatedDepositRates.LastOrDefault();
                    var toDeleteRates = depositRates.Where(x => x.SavingMonth > lastNewRate.SavingMonth.AddDays(1)).ToList();
                    dbContext.RemoveRange(toDeleteRates);
                }

                var savingGoal = await dbContext.SavingGoals.FirstOrDefaultAsync(x => x.Id == req.SavingGoalId);
                if (req.NewDateRate is not 0.00) savingGoal.DepositRate = req.NewDateRate;

                dbContext.SaveChanges();


                await SendAsync(new UpdateDepositRatesResponse { SavingGoal = savingGoal.asDto() });

            }
        }
    }
    public record UpdateDepositRatesRequest
    {
        [FromClaim("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")]
        public string UserId { get; set; }
        public required int SavingGoalId { get; set; }
        public DepositRateDto[] UpdatedDepositRates { get; set; }
        public double NewDateRate { get; set; }
    }
    public record UpdateDepositRatesResponse
    {
        public SavingGoalDto SavingGoal { get; set; }
    }
}
