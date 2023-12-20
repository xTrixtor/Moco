using FastEndpoints;
using MocoApi.Endpoints.Revenue;
using MocoApi.Extensions;
using MocoApi.Models.Moco.Resource;

namespace Moco.Api.Endpoints.FixedCost
{
    public class UpdateFixedCostEndpoint : Endpoint<FixedCostUDto>
    {
        public override void Configure()
        {
            Put("/fixedCost");
            Policies("User");
        }

        public async override Task HandleAsync(FixedCostUDto uDto, CancellationToken ct)
        {
            using (var dbContext = new MoCoContext())
            {
                var updatedRev = await uDto.Update(dbContext);
                await dbContext.SaveChangesAsync();

                await SendAsync(new UpdateRevenueResponse { Success = true });
            }
        }
    }

    public record FixedCostUDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Value { get; set; }
        public int GroupCostId { get; set; }
        public TimeInterval TimeInterval { get; set; }
    }
}
