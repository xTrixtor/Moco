using FastEndpoints;
using Moco.Api.DataStore;
using Moco.Api.Models.Moco.Dto;
using MocoApi.Extensions;
using MocoApi.Models.Moco.Resource;

namespace Moco.Api.Endpoints.FixedCost
{
    public class GetFixedCostsByTimeIntervalEndpoint : Endpoint<GetFixedCostsByTimeIntervalRequest, GetFixedCostsByTimeIntervalResponse>
    {
        
        public override void Configure()
        {
            Get("fixedCost/byTimeInterval");
            Policies("User");
        }

        public async override Task HandleAsync(GetFixedCostsByTimeIntervalRequest req, CancellationToken ct)
        {
            using (var dbContext = new MoCoContext())
            {
                var groupedCosts = new Dictionary<TimeInterval, FixedCostDto[]>();
                var fixedCosts = dbContext.GroupCosts.Where(x => x.UserId == req.UserId).ToList().SelectMany(x => x.FixedCosts).ToArray().Select(x => x.asDto());
                try
                {
                    foreach (var timeInterval in Enum.GetValues<TimeInterval>())
                    {
                        var fixedCostsOfTimeInterval = fixedCosts.Where(x => (int) x.TimeInterval == (int)timeInterval).ToArray();
                        groupedCosts[timeInterval] = fixedCostsOfTimeInterval;
                    }
                }
                catch (Exception e)
                {
                    
                    throw e;
                }
                await SendAsync(new GetFixedCostsByTimeIntervalResponse { FixedCostsByTimeInterval = groupedCosts });
            }
        }
    }
    public record GetFixedCostsByTimeIntervalRequest
    {
        [FromClaim("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")]
        public string UserId { get; set; }
    }

    public record GetFixedCostsByTimeIntervalResponse
    {
        public required Dictionary<TimeInterval, FixedCostDto[]> FixedCostsByTimeInterval { get; set; }
    }
}
