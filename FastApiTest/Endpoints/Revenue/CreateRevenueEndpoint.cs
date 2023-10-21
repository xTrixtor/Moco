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
        }

        public async override Task HandleAsync(CreateRevenueRequest req, CancellationToken ct)
        {
            using(var dbContext = new MoCoContext())
            {
                var rev = await req.CRevenueDto.PrepareAddAsync(dbContext);
                dbContext.SaveChanges();
            }

            await SendAsync(new CreateRevenueResponse { Success = true });
        }
    }
    public record CreateRevenueRequest
    {
        public required RevenueDto CRevenueDto { get; set; }
    }
    public record CreateRevenueResponse
    {
        public bool Success { get; set; }
        public int MyProperty { get; set; }     
    }
}
