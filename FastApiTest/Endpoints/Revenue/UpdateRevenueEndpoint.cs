using MocoApi.Extensions;
using MocoApi.Models.Moco.Dto;
using FastEndpoints;

namespace MocoApi.Endpoints.Revenue
{
    public class UpdateRevenueEndpoint: Endpoint<UpdateRevenueRequest, UpdateRevenueResponse>
    {
        public override void Configure()
        {
            Put("/revenue");
        }

        public async override Task HandleAsync(UpdateRevenueRequest req, CancellationToken ct)
        {
            using(var dbContext = new MoCoContext())
            {
                var updatedRev = await req.URevenueDto.Update(dbContext);
                await dbContext.SaveChangesAsync();

                await SendAsync(new UpdateRevenueResponse { Success = true });
            }
        }
    }
    public record UpdateRevenueRequest
    {
        public required RevenueDto URevenueDto { get; set; }
    }
    public record UpdateRevenueResponse
    {
        public bool Success { get; set; }
    }
}
