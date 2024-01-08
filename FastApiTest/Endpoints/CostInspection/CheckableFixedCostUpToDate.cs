using FastEndpoints;
using Moco.Api.Factories.Db;
using Moco.Api.Models.Moco.Dto;
using Moco.Api.Models.Moco.Resource;
using MocoApi.Extensions;

namespace Moco.Api.Endpoints.CostInspection
{
    public class CheckableFixedCostUptoDate : Endpoint<CheckableFixedCostUptoDateRequest, bool>
    {
        private readonly MocoContextFactory mocoContextFactory;

        public CheckableFixedCostUptoDate(MocoContextFactory mocoContextFactory)
        {
            this.mocoContextFactory = mocoContextFactory;
        }
        public override void Configure()
        {
            Post("/inspection/checkableFixedCost/upToDate");
            Policies("User");
        }
        public async override Task HandleAsync(CheckableFixedCostUptoDateRequest req, CancellationToken ct)
        {
            if(!req.IsUpgradeable) await SendAsync(false);

            using (var context = mocoContextFactory.CreateMocoContext())
            {
                var createdFixedCostIds = req.AlreadyCreatedCheckableFixedCosts.Select(x => x.Id).ToList();

                var createableFixedCosts = context.GroupCosts.Where(x => x.UserId == req.UserId).SelectMany(x => x.FixedCosts).Where(x => !createdFixedCostIds.Contains(x.Id)).ToArray();
                foreach (var createableFixedCost in createableFixedCosts)
                {
                    context.CheckableFixedCosts.Add(createableFixedCost.toCheckable(req.CostInspectionId));
                }
                await context.SaveChangesAsync();
            }
            await SendAsync(true);
        }
    }
    public record CheckableFixedCostUptoDateRequest
    {
        [FromClaim("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")]
        public string UserId { get; set; }
        public bool IsUpgradeable { get; set; }
        public int CostInspectionId { get; set; }
        public CheckableFixedCostDto[] AlreadyCreatedCheckableFixedCosts { get; set; }
    }
}
