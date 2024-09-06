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
            using(var dbContext = new MoCoContext())
            {
                //var rev = await req.RevenueCDto.PrepareAddAsync(dbContext);
                dbContext.SaveChanges();
            }

            await SendAsync(new CreateRevenueResponse { Success = true });
        }
    }
    public record CreateRevenueRequest
    {
        [FromClaim("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")]
        public string UserId { get; set; }
        public required RevenueCDto RevenueCDto { get; set; }
    }
    public record CreateRevenueResponse
    {
        public bool Success { get; set; }
        public int MyProperty { get; set; }     
    }
    public record RevenueCDto
    {
        public string Name { get; set; }
        public double Value { get; set; }
    }
}
