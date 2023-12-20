using FastEndpoints;
using Moco.Api.Models.Moco.Resource;
using MocoApi.Endpoints.Budget;
using MocoApi.Extensions;

namespace Moco.Api.Endpoints.FixedCost
{
    public class GetAllFixedCostsEndpoint : Endpoint<GetAllFixedCostsRequest,GetAllFixedCostsEndpointResponse>
    {
        public override void Configure()
        {
            Get("/fixedCost");
            Policies("User");
        }

        public async override Task HandleAsync(GetAllFixedCostsRequest req, CancellationToken ct)
        {
            using (var dbContext = new MoCoContext())
            {
                var groupCosts = dbContext.GroupCosts.Where(x => x.UserId == req.UserId).ToList().Select(x => x.asDto()).ToArray();
                await SendAsync(new GetAllFixedCostsEndpointResponse { FixedCostGroups = groupCosts });
            }
        }
    }
    public record GetAllFixedCostsRequest
    {
        [FromClaim("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")]
        public string UserId { get; set; }
    }

    public record GetAllFixedCostsEndpointResponse
    {
        public required GroupCostDto[] FixedCostGroups { get; set; }
    }
}
