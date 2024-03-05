using FastEndpoints;
using MocoApi.Endpoints.Charge;
using MocoApi.Extensions;
using MocoApi.Models.Moco.Dto;

namespace MocoApi.Endpoints.Budget
{
    public class GetBudgetByIdEndpoint: Endpoint<GetBudgetWithChargesRequest, GetBudgetWithChargesResponse>
    {
        public override void Configure()
        {
            Get("/budget/{BudgetId}");
            Policies("User");
            Summary(s =>
            {
                s.Summary = "Gets Budget with Charges";
                s.Description = "Gets Budget with his Charges from User";
                s.Responses[200] = "Returns Budget";
                s.Responses[403] = "Return false";
            });
        }

        public async override Task HandleAsync(GetBudgetWithChargesRequest req, CancellationToken ct)
        {
            int budgetId = Route<int>("BudgetId");
            using (var dbContext = new MoCoContext())
            {
                var budget = await dbContext.Budgets.FindAsync(budgetId);
                await SendAsync(new GetBudgetWithChargesResponse { Charges = new List<ChargeDto>().ToArray() });
            }
        }
    }

    public record BudgetWithChargesDto
    {
        public BudgetDto Budget { get; set; }
        public ChargeDto[] Charges { get; set; }
    }

    public record GetBudgetWithChargesRequest
    {
        [FromClaim("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")]
        public string? UserId { get; set; }
    }
    public record GetBudgetWithChargesResponse
    {
        public ChargeDto[] Charges { get; set; }
    }
}
