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
                    var budgets = dbContext.Budgets.Where(x => x.UserId == req.UserId).ToList().Select(x => x.asDto()).ToList();
                    await SendAsync(new GetBudgetsResponse { Budgets = budgets });
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
        [FromClaim("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")]
        public string UserId { get; set; }
    }
    public record GetBudgetsResponse
    {
        public required IEnumerable<BudgetDto> Budgets { get; set; }
    }
}
