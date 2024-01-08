using FastEndpoints;
using Moco.Api.Factories.Db;
using System.Net.Http;

namespace Moco.Api.Endpoints.CostInspection
{
    public class InitializeCostInspectionEndpoint : Endpoint<CostInspectionIRequest, CostInspectionIResponse>
    {
        private readonly MocoContextFactory mocoContextFactory;

        public InitializeCostInspectionEndpoint(MocoContextFactory mocoContextFactory)
        {
            this.mocoContextFactory = mocoContextFactory;
        }
        public override void Configure()
        {
            Post("/inspection/initialize");
            Policies("User");
        }

        public async override Task HandleAsync(CostInspectionIRequest req, CancellationToken ct)
        {
            using (var dbContext = mocoContextFactory.CreateMocoContext())
            {
                var newCostInspection = new Models.Moco.Resource.CostInspection { UserYearMonthKey = req.UserYearMonthKey, CreatedAt = DateTime.Now };
                await dbContext.CostInspections.AddAsync(newCostInspection);
                await dbContext.SaveChangesAsync();
            }
        }
    }
    public record CostInspectionIRequest
    {
        public required string UserYearMonthKey { get; set; }
    }

    public record CostInspectionIResponse
    {
        public bool Success { get; set; }
    }
}
