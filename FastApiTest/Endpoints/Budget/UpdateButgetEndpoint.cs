using MocoApi.Extensions;
using MocoApi.Models.Keycloak;
using MocoApi.Models.Moco.Dto;
using FastEndpoints;

namespace MocoApi.Endpoints.Budget
{
    public class UpdateButgetEndpoint: Endpoint<UpdateBudgetRequest, UpdateBudgetResponse>
    {
        public override void Configure()
        {
            Put("/budget");
            Summary(s =>
            {
                s.Summary = "Updates Charge Data";
                s.Description = "Updates ";
                s.ExampleRequest = new UpdateBudgetRequest { UBudgetDto = new BudgetDto { Name = "Essen", Id = 1, Value= 300 } };
                s.ResponseExamples[200] = new UpdateBudgetResponse { Success = true };
                s.Responses[200] = "Returns true";
                s.Responses[403] = "Return false";
            });
        }
        public async override Task HandleAsync(UpdateBudgetRequest req, CancellationToken ct)
        {
            using(var dbContext = new MoCoContext())
            {
                await req.UBudgetDto.Update(dbContext);
                await dbContext.SaveChangesAsync();
            }

            await SendAsync(new UpdateBudgetResponse { Success = true });
        }
    }


    public record UpdateBudgetRequest
    {
        public required BudgetDto UBudgetDto{ get; set; }
    }
    public record UpdateBudgetResponse
    {
        public bool Success { get; set; } 
    }
}
