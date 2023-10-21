using MocoApi.Extensions;
using MocoApi.Models.Moco.Dto;
using FastEndpoints;
using Microsoft.EntityFrameworkCore;

namespace MocoApi.Endpoints.Budget
{

    public class GetBudgetsEndpoint: Endpoint<GetBudgetsRequest,GetBudgetsResponse>
    {
        public override void Configure()
        {
            Get("/budget");
            AllowAnonymous();
        }
        public async override Task HandleAsync(GetBudgetsRequest req, CancellationToken ct)
        {
            using (var dbContext = new MoCoContext())
            {
                try
                {
                    IQueryable<Models.Moco.Resource.Budget> query = dbContext.Budgets;
                    if(req.UserId is not null)
                        query = query.Where(b => b.UserId == req.UserId);

                    var result = await query.Select(x => x.asDto()).ToListAsync();
                    await SendAsync(new GetBudgetsResponse { Budgets = result });
                }
                catch (Exception)
                {
                    ThrowError("Charges couldnt not be loaded");
                }
            }
        }
    }
    public record GetBudgetsRequest
    {
        [FromHeader]
        public string UserId { get; set; }
    }
    public record GetBudgetsResponse
    {
        public required IEnumerable<BudgetDto> Budgets { get; set; }
    }
}
