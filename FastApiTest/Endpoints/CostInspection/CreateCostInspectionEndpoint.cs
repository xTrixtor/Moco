using FastEndpoints;
using Microsoft.EntityFrameworkCore;
using Moco.Api.DataStore;
using Moco.Api.Factories.Db;
using Moco.Api.Models.Moco.Dto;
using MocoApi.Extensions;
using Newtonsoft.Json;

namespace Moco.Api.Endpoints.CostInspection
{
    public class CreateCostInspectionEndpoint : Endpoint<CostInspectionCRequest, CostInspectionCResponse>
    {
        private readonly MocoContextFactory mocoContextFactory;
        private readonly UtilsService utilsService;

        public CreateCostInspectionEndpoint(MocoContextFactory mocoContextFactory, IHttpClientFactory httpClientFactory, UtilsService utilsService)
        {
            this.mocoContextFactory = mocoContextFactory;
            this.utilsService = utilsService;
        }
        public override void Configure()
        {
            Post("/inspection");
            Policies("User");
        }

        public async override Task HandleAsync(CostInspectionCRequest req, CancellationToken ct)
        {
            var userYearMonthKey = $"{req.UserId}-{req.Year}-{req.MonthNumber}";

            using (var dbContext = mocoContextFactory.CreateMocoContext())
            {
                var fixedCosts = dbContext.GroupCosts.Where(x => x.UserId == req.UserId).ToList().SelectMany(x => x.FixedCosts).ToArray().Select(x => x.asDto());
                var checkableFixcost = new List<CheckableFixedCostDto>();

                foreach (var fixedCost in fixedCosts)
                {
                    var key = 0;

                    var calculatedCost = utilsService.calculateMontlyChargeCost(fixedCost);
                    fixedCost.Value = calculatedCost;

                    checkableFixcost.Add(fixedCost.toCheckable(key));
                    key++;
                }

                var checkableFixcostJson = JsonConvert.SerializeObject(checkableFixcost);

                var newCostInspection = new MocoApi.Models.Moco.Resource.CostInspection
                {
                    UserYearMonthKey = userYearMonthKey,
                    MonthlyFixedcostsJson = checkableFixcostJson,
                    CreatedAt = DateTime.Now
                };
                dbContext.CostInspections.Add(newCostInspection);

                await dbContext.SaveChangesAsync();

                var budgets = dbContext.Budgets.ToList().Where(x => x.UserId == req.UserId).Select(x => x.asDto()).ToArray();
                var budgetCharges = new List<Models.Moco.Resource.MonthlyBudget>();
                foreach (var budget in budgets)
                {
                    var monthlyBudget = new Models.Moco.Resource.MonthlyBudget { Name = budget.Name, Limit = budget.Limit, CostInspectionId = newCostInspection.Id };
                    await dbContext.MonthlyBudgets.AddAsync(monthlyBudget);
                }
                var originRevenues = dbContext.Revenue.Where(x => x.UserId == req.UserId).ToList();
                foreach (var revenue in originRevenues)
                {
                    await dbContext.Credits.AddAsync(new Models.Moco.Resource.Credit { Name = revenue.Source, Value = revenue.Value, CostInspectionId = newCostInspection.Id });
                }
                await dbContext.SaveChangesAsync();
            }
            await SendAsync(new CostInspectionCResponse { Success = true });
        }
    }

    public record CostInspectionCRequest
    {
        [FromClaim("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")]
        public string? UserId { get; set; }
        public int MonthNumber { get; set; }
        public int Year { get; set; }
    }

    public record CostInspectionCResponse
    {
        public bool Success { get; set; }
    }
}
