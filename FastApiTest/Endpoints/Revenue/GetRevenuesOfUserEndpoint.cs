using MocoApi.Extensions;
using MocoApi.Models.Moco.Dto;
using FastEndpoints;

namespace MocoApi.Endpoints.Revenue
{
    public class GetRevenuesOfUserEndpoint : EndpointWithoutRequest<GetRevenuesResponse>
    {
        public override void Configure()
        {
            Get("/revenue/{UserId}");
            Policies("User");
        }

        public async override Task HandleAsync(CancellationToken ct)
        {
            var userId = Route<string>("UserId");
            using (var dbContext = new MoCoContext())
            {
                var revenues = dbContext.Revenue.ToList().Where(x => x.UserId.Equals(userId)).Select(x => x.asDto()).ToList();
                await SendAsync(new GetRevenuesResponse { Revenues = revenues });
            }
        }
    }

    public record GetRevenuesResponse
    {
        public IEnumerable<RevenueDto>  Revenues { get; set; }
    }
}
