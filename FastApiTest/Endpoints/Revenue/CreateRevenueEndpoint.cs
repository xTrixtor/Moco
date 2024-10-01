using MocoApi.Extensions;
using MocoApi.Models.Moco.Dto;
using FastEndpoints;

namespace MocoApi.Endpoints.Revenue
{
    public class CreateRevenueEndpoint: Endpoint<CreateRevenueRequest, CreateRevenueResponse>
    {
        public override void Configure()
        {
            Post("/revenue");
            Policies("User");
        }

        public async override Task HandleAsync(CreateRevenueRequest req, CancellationToken ct)
        {
            RevenueDto newRevenue;
            using(var dbContext = new MoCoContext())
            {
                var rev = await req.Revenue.PrepareAddAsync(dbContext, req.UserId);
                dbContext.SaveChanges();
                newRevenue = rev.asDto();
            }

            await SendAsync(new CreateRevenueResponse {NewRevenueDto = newRevenue });
        }
    }
    public record CreateRevenueRequest
    {
        [FromClaim("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")]
        public string UserId { get; set; }
        public required RevenueDto Revenue { get; set; }
    }
    public record CreateRevenueResponse
    {
        public RevenueDto NewRevenueDto { get; set; }
    }
    public record RevenueCDto
    {
        public string Name { get; set; }
        public double Value { get; set; }
    }
}
