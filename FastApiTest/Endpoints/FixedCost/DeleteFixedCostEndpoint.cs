using FastEndpoints;
using Microsoft.EntityFrameworkCore;
using Moco.Api.Factories.Db;

namespace Moco.Api.Endpoints.FixedCost
{
    public class DeleteFixedCostEndpoint : Endpoint<DeleteFixedCostRequest>
    {
        private readonly MocoContextFactory mocoContextFactory;

        public DeleteFixedCostEndpoint(MocoContextFactory mocoContextFactory)
        {
            this.mocoContextFactory = mocoContextFactory;
        }
        public override void Configure()
        {
            Delete("/fixedCost/{FixedCostId}");
            Policies("User");
        }

        public async override Task HandleAsync(DeleteFixedCostRequest req, CancellationToken ct)
        {
            using(var dbContext = mocoContextFactory.CreateMocoContext())
            {
                try
                {
                    var selectedFixedCost = await dbContext.FixedCosts.FirstOrDefaultAsync(x => x.Id.Equals(req.FixedCostId));
                    if (selectedFixedCost == null)
                        ThrowError("Could not find Fixed Cost with given Id");

                    dbContext.FixedCosts.Remove(selectedFixedCost);
                    await dbContext.SaveChangesAsync();

                    await SendOkAsync();
                }
                catch (Exception)
                {
                    ThrowError("Fixed Cost couldnt not be loaded");
                }
            }
        }
    }
    public record DeleteFixedCostRequest
    {
        public int FixedCostId { get; set; }
    }
}
