using FastEndpoints;
using Moco.Api.Factories.Db;
using MocoApi.Extensions;

namespace Moco.Api.Endpoints.CostInspection.MonthlyBudget
{
    public class UpdateMonthlyBudgetEnpoint: Endpoint<MonthlyBudgetUDto, MonthlyBudgetUResponse>
    {
        private readonly MocoContextFactory mocoContextFactory;

        public UpdateMonthlyBudgetEnpoint(MocoContextFactory mocoContextFactory, IHttpClientFactory httpClientFactory)
        {
            this.mocoContextFactory = mocoContextFactory;
        }
        public override void Configure() 
        {
            Put("/inspection/monthlyBudget");
            Policies("User");
        }

        public override async Task HandleAsync(MonthlyBudgetUDto req, CancellationToken ct)
        {
            using (var dbContext = mocoContextFactory.CreateMocoContext())
            {
                var budgets = dbContext.Budgets.ToList().Where(x => x.UserId == req.UserId).Select(x => x.asDto()).ToArray();
                var budgetCharges = new List<Models.Moco.Resource.MonthlyBudget>();
                foreach (var budget in budgets)
                {
                    var monthlyBudget = new Models.Moco.Resource.MonthlyBudget { Name = budget.Name, Limit = budget.Limit, CostInspectionId = req.CostInspectionId };
                    await dbContext.MonthlyBudgets.AddAsync(monthlyBudget);
                }
                await dbContext.SaveChangesAsync();
            }
            await SendAsync(new MonthlyBudgetUResponse { Success = true });
        }
    }

    public record MonthlyBudgetUDto
    {
        [FromClaim("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")]
        public string? UserId { get; set; }
        public int CostInspectionId { get; set; }
    }

    public record MonthlyBudgetUResponse
    {
        public bool Success { get; set; }
    }
}
