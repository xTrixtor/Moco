using FastEndpoints;
using Moco.Api.Factories.Db;
using Moco.Api.Models.Moco.Dto;
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
