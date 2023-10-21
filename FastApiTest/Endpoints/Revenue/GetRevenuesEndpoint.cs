using MocoApi.Extensions;
using MocoApi.Models.Moco.Dto;
using FastEndpoints;

namespace MocoApi.Endpoints.Revenue
{
    public class GetRevenuesEndpoint : EndpointWithoutRequest<GetRevenuesResponse>
    {
        public override void Configure()
        {
            Get("/revenue");
            AllowAnonymous();
        }

        public async override Task HandleAsync(CancellationToken ct)
        {
            using (var dbContext = new MoCoContext())
            {
                var revenues = dbContext.Revenue.ToList().Select(x => x.asDto()).ToList();
                await SendAsync(new GetRevenuesResponse { Revenues = revenues });
            }
        }
    }

    public record GetRevenuesResponse
    {
        public IEnumerable<RevenueDto> Revenues { get; set; }
    }
}
