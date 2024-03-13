using FastEndpoints;
using Moco.Api.Models.Moco.Dto;
using MocoApi.Extensions;

namespace Moco.Api.Endpoints.SavingGoals.Deposits
{
    public class LazyLoadDepositRateEndpoint : Endpoint<LazyLoadDepositRateRequest, LazyLoadDepositRateResponse>
    {
        public override void Configure()
        {
            Get("/savingGoals/lazyload");
            Policies("User");
        }

        public async override Task HandleAsync(LazyLoadDepositRateRequest req, CancellationToken ct)
        {
            using (var dbContext = new MoCoContext())
            {
                if (req.hidePaidDeposits)
                {
                    var totalRates = dbContext.DepositRates.Where(x => x.isPaid == false).Count();

                    var firstNotPaidRate = dbContext.DepositRates
                    .OrderBy(x => x.SavingMonth)
                    .Where(x => x.SavingGoalId == req.SavingGoalId &&
                        x.isPaid == false)
                    .First().asDto();


                    var fromMonth = firstNotPaidRate.SavingMonth.AddMonths(req.FirstOfNexPage);

                    var depositRates = dbContext.DepositRates
                    .OrderBy(x => x.SavingMonth)
                    .Where(x => x.SavingGoalId == req.SavingGoalId &&
                    x.SavingMonth >= fromMonth &&
                    x.isPaid == false)
                    .Take(10)
                    .Select(x => x.asDto()).ToArray();

                    await SendAsync(new LazyLoadDepositRateResponse { DepositRates = depositRates, TotalRates = totalRates });
                }
                else
                {
                    var totalRates = dbContext.DepositRates.Count();

                    var firstDepositRate = dbContext.DepositRates
                    .OrderBy(x => x.SavingMonth)
                    .Where(x => x.SavingGoalId == req.SavingGoalId)
                    .First().asDto();


                    var fromMonth = firstDepositRate.SavingMonth.AddMonths(req.FirstOfNexPage);

                    var depositRates = dbContext.DepositRates
                    .OrderBy(x => x.SavingMonth)
                    .Where(x => x.SavingGoalId == req.SavingGoalId &&
                    x.SavingMonth >= fromMonth)
                    .Take(10)
                    .Select(x => x.asDto()).ToArray();

                    await SendAsync(new LazyLoadDepositRateResponse { DepositRates = depositRates, TotalRates = totalRates });
                }

            }
        }
    }
    public record LazyLoadDepositRateRequest
    {
        [FromClaim("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")]
        public string UserId { get; set; }
        public required int SavingGoalId { get; set; }
        public required int FirstOfNexPage { get; set; }
        public bool hidePaidDeposits { get; set; }

    }
    public record LazyLoadDepositRateResponse
    {
        public DepositRateDto[] DepositRates { get; set; }
        public int TotalRates { get; set; }
    }
}
