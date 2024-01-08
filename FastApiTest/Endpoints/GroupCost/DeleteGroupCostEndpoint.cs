namespace Moco.Api.Endpoints.GroupCost
{
    using FastEndpoints;
    using Microsoft.EntityFrameworkCore;
    using Moco.Api.Extensions;
    using Moco.Api.Factories.Db;

    public class DeleteGroupCostEndpoint : Endpoint<DeleteGroupCostRequest>
    {
        private readonly MocoContextFactory mocoContextFactory;

        public DeleteGroupCostEndpoint(MocoContextFactory mocoContextFactory)
        {
            this.mocoContextFactory = mocoContextFactory;
        }
        public override void Configure()
        {
            Delete("/groupCost/{GroupCostId}");
            Policies("User");
        }

        public async override Task HandleAsync(DeleteGroupCostRequest req, CancellationToken ct)
        {
            using (var dbContext = mocoContextFactory.CreateMocoContext())
            {
                try
                {
                    var selectedGroupCost = await dbContext.GroupCosts.FirstOrDefaultAsync(x => x.Id.Equals(req.GroupCostId));
                    if (selectedGroupCost is null)
                    {
                        ThrowError("Could not find Group Cost with given Id");

                    }

                    foreach (var fixedCost in selectedGroupCost.FixedCosts)
                    {
                        await fixedCost.DeleteAsync(dbContext);
                    }
                    dbContext.GroupCosts.Remove(selectedGroupCost);

                    await dbContext.SaveChangesAsync();

                    await SendOkAsync();
                }
                catch (Exception)
                {
                    ThrowError("Group Cost couldnt not be loaded");
                }
            }
        }
    }
    public record DeleteGroupCostRequest
    {
        public int GroupCostId { get; set; }
    }
}

