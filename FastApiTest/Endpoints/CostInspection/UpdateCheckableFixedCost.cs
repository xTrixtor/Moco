using FastEndpoints;
using Microsoft.EntityFrameworkCore;
using Moco.Api.Factories.Db;
using MocoApi.Extensions;

namespace Moco.Api.Endpoints.CostInspection
{
    public class CheckFixedCost: Endpoint<UpdateCheckableFixedCostRequest, bool>
    {
        private readonly MocoContextFactory mocoContextFactory;

        public CheckFixedCost(MocoContextFactory mocoContextFactory)
        {
            this.mocoContextFactory = mocoContextFactory;
        }
        public override void Configure()
        {
            Put("/inspection/checkableFixedCost");
            Policies("User");
        }
        public async override Task HandleAsync(UpdateCheckableFixedCostRequest req, CancellationToken ct)
        {

            using(var context = mocoContextFactory.CreateMocoContext())
            {
                await req.CheckableFixedCostUDto.UpdateAsync(context);
                await context.SaveChangesAsync();
            }
            await SendAsync(true);
        }
    }
    public record UpdateCheckableFixedCostRequest
    {
        [FromClaim("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")]
        public string UserId { get; set; }
        public CheckableFixedCostUDto CheckableFixedCostUDto { get; set; }
    }

    public record CheckableFixedCostUDto
    {
        public int Id { get; set; }
        public bool IsChecked { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
