using FastEndpoints;
using MocoApi.Extensions;
using MocoApi.Models.Moco.Dto;

namespace MocoApi.Endpoints.Budget
{
    public class CreateBudgetEndpoint : Endpoint<CBudgetRequest, CBudgetResponse>
    {
        public override void Configure()
        {
            Post("/budget");
        }

        public async override Task HandleAsync(CBudgetRequest req, CancellationToken ct)
        {
            using (var dbContext = new MoCoContext())
            {
                var charge = await req.Budget.PrepareAddAsync(dbContext);
                await dbContext.SaveChangesAsync();
            }
            await SendAsync(new CBudgetResponse { Budget = req.Budget, Success = true });
        }
    }

    public record CBudgetRequest
    {
        public required BudgetDto Budget { get; set; }
    }
    public record CBudgetResponse
    {
        public BudgetDto Budget { get; set; }
        public bool Success { get; set; }
    }
}
