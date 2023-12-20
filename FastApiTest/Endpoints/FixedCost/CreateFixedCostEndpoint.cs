using FastEndpoints;
using Moco.Api.Factories.Db;
using MocoApi.Extensions;
using MocoApi.Models.Moco.Resource;

namespace Moco.Api.Endpoints.FixedCost
{
    public class CreateFixedCostEndpoint : Endpoint<CreateFixedCDto>
    {
        private readonly MocoContextFactory mocoContextFactory;

        public CreateFixedCostEndpoint(MocoContextFactory mocoContextFactory)
        {
            this.mocoContextFactory = mocoContextFactory;
        }
        public override void Configure()
        {
            Post("/fixedCost");
            Policies("User");
        }

        public async override Task HandleAsync(CreateFixedCDto fixedCostDto, CancellationToken ct)
        {
            using (var dbContext = mocoContextFactory.CreateMocoContext())
            {
                var charge = await fixedCostDto.PrepareAddAsync(dbContext);
                await dbContext.SaveChangesAsync();
            }
            await SendOkAsync();
        }
    }

    public record CreateFixedCDto
    {
        public required string Name { get; set; }
        public required double Value { get; set; }
        public required int GroupCostId { get; set; }
        public required TimeInterval TimeInterval { get; set; }
    }
}
