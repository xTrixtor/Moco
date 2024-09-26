using FastEndpoints;
using Microsoft.EntityFrameworkCore;
using Moco.Api.Factories.Db;
using Moco.Api.Models.Moco.Dto;
using Moco.Api.Models.Moco.Resource;
using MocoApi.Extensions;
using Newtonsoft.Json;

namespace Moco.Api.Endpoints.CostInspection
{
    public class CheckableFixedCostUptoDate : Endpoint<CheckableFixedCostUptoDateRequest,bool>
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

            using (var context = mocoContextFactory.CreateMocoContext())
            {
                var costInspection = await context.CostInspections.FirstOrDefaultAsync(x => x.Id == req.CostInspectionId);

                var groupCosts = context.GroupCosts.ToList().Where(x => x.UserId == req.UserId).Select(x => x.asDto()).ToArray();
                var checkableFixcost = groupCosts.SelectMany(x => x.FixedCosts).Select((x, key) => x.toCheckable(key)).ToArray();

                var checkableFixcostJson = JsonConvert.SerializeObject(checkableFixcost);

                costInspection.MonthlyFixedcostsJson = checkableFixcostJson;

                context.SaveChanges();
            }
            await SendAsync(true);
        }
    }
    public record CheckableFixedCostUptoDateRequest
    {
        [FromClaim("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")]
        public string UserId { get; set; }
        public int CostInspectionId { get; set; }
    }
}
