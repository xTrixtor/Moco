using FastEndpoints;
using MocoApi.Endpoints.Revenue;
using MocoApi.Extensions;

namespace Moco.Api.Endpoints.GroupCost
{
    public class UpdateGroupCostEndpoint: Endpoint<GroupCostUDto>
    {
        public override void Configure()
        {
            Put("/groupCost");
            Policies("User");
        }

        public async override Task HandleAsync(GroupCostUDto uDto, CancellationToken ct)
        {
            using (var dbContext = new MoCoContext())
            {
                var updatedRev = await uDto.Update(dbContext);
                await dbContext.SaveChangesAsync();

                await SendAsync(new UpdateRevenueResponse { Success = true });
            }
        }
    }

    public record GroupCostUDto
    {
        public required int Id { get; set; }
        public string Name { get; set; }
    }
}
