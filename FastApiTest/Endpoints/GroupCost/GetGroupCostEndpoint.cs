using FastEndpoints;
using Moco.Api.Endpoints.FixedCost;
using Moco.Api.Models.Moco.Dto;
using MocoApi.Extensions;

namespace Moco.Api.Endpoints.GroupCost
{
    public class GetGroupCostEndpoint : Endpoint<GetGroupCostRequest, GetGroupCostResponse>
    {
        public override void Configure()
        {
            Get("/groupCost");
            Policies("User");
        }

        public async override Task HandleAsync(GetGroupCostRequest req, CancellationToken ct)
        {
            using (var dbContext = new MoCoContext())
            {
                var groupCosts = dbContext.GroupCosts.ToList().Where(x => x.UserId == req.UserId).Select(x => x.asDto()).ToArray();
                await SendAsync(new GetGroupCostResponse { GroupedCosts = groupCosts });
            }
        }
    }

    public record GetGroupCostRequest
    {
        [FromClaim("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")]
        public string UserId { get; set; }
    }

    public record GetGroupCostResponse
    {
        public required GroupCostDto[] GroupedCosts { get; set; }
    }
}
