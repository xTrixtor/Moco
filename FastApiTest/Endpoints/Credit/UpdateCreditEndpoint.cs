using FastEndpoints;
using MocoApi.Endpoints.Budget;
using MocoApi.Extensions;
using MocoApi.Models.Moco.Dto;

namespace Moco.Api.Endpoints.Credit
{
    public class UpdateCreditEndpoint : Endpoint<UpdateCreditRequest, UpdateBudgetResponse>
    {
        public override void Configure()
        {
            Put("/credit");
            Policies("User");
        }
        public async override Task HandleAsync(UpdateCreditRequest req, CancellationToken ct)
        {
            using (var dbContext = new MoCoContext())
            {
                await req.CreditUDto.UpdateAsync(dbContext);
                await dbContext.SaveChangesAsync();
            }

            await SendAsync(new UpdateBudgetResponse { Success = true });
        }
    }

    public record UpdateCreditRequest
    {
        public required CreditUDto CreditUDto { get; set; }
    }
    public record UpdateBudgetResponse
    {
        public bool Success { get; set; }
    }

    public record CreditUDto
    {
        public required int Id { get; set; }
        public string Name { get; set; }
        public double Value { get; set; }
    }
}
