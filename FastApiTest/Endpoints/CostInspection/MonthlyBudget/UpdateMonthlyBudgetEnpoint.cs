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
                await req.Update(dbContext);
                await dbContext.SaveChangesAsync();
            }
            await SendAsync(new MonthlyBudgetUResponse { Success = true });
        }
    }

    public record MonthlyBudgetUDto
    {
        [FromClaim("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")]
        public string? UserId { get; set; }
        public int MonthlyBudgetId { get; set; }
        public string Name { get; set; }
        public double Limit{ get; set; }
    }

    public record MonthlyBudgetUResponse
    {
        public bool Success { get; set; }
    }
}
