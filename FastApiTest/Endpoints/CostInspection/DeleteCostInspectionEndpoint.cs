using FastEndpoints;
using Microsoft.EntityFrameworkCore;
using Moco.Api.Endpoints.GroupCost;
using Moco.Api.Factories.Db;

namespace Moco.Api.Endpoints.CostInspection
{
    public class DeleteCostInspectionEndpoint : Endpoint<DeleteCostInspectionRequest>
    {
        private readonly MocoContextFactory mocoContextFactory;

        public DeleteCostInspectionEndpoint(MocoContextFactory mocoContextFactory)
        {
            this.mocoContextFactory = mocoContextFactory;
        }
        public override void Configure()
        {
            Delete("/inspection/{CostInspectionID}");
            Policies("User");
        }

        public async override Task HandleAsync(DeleteCostInspectionRequest req, CancellationToken ct)
        {
            using (var dbContext = mocoContextFactory.CreateMocoContext())
            {
                try
                {
                    var selectedCostInspection = await dbContext.CostInspections.FirstOrDefaultAsync(x => x.Id.Equals(req.CostInspectionID));
                    if (selectedCostInspection is null)
                    {
                        ThrowError("Could not find CostInspection with given Id");

                    }

                    
                    dbContext.CostInspections.Remove(selectedCostInspection);

                    await dbContext.SaveChangesAsync();

                    await SendOkAsync();
                }
                catch (Exception)
                {
                    ThrowError("CostInspection couldnt not be loaded");
                }
            }
        }
    }
    public record DeleteCostInspectionRequest
    {
        public int CostInspectionID { get; set; }
    }
}
