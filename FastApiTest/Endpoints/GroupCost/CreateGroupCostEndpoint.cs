using FastEndpoints;
using Moco.Api.Endpoints.FixedCost;
using Moco.Api.Factories.Db;
using Moco.Api.Models.Moco.Resource;
using MocoApi.Extensions;

namespace Moco.Api.Endpoints.GroupCost
{
    public class CreateGroupCostEndpoint : Endpoint<GroupCostCDto>
    {
        private readonly MocoContextFactory mocoContextFactory;

        public CreateGroupCostEndpoint(MocoContextFactory mocoContextFactory)
        {
            this.mocoContextFactory = mocoContextFactory;
        }
        public override void Configure()
        {
            Post("/groupCost");
            Policies("User");
        }

        public async override Task HandleAsync(GroupCostCDto groupCostCDto, CancellationToken ct)
        {
            using (var dbContext = mocoContextFactory.CreateMocoContext())
            {
                var charge = await groupCostCDto.PrepareAddAsync(dbContext);
                await dbContext.SaveChangesAsync();
            }
            await SendOkAsync();
        }
    }

    public record GroupCostCDto {
        public required string Name { get; set; }

        [FromClaim("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")]
        public string UserId { get; set; }
    }
}
