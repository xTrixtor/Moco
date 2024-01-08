using MocoApi.Extensions;
using MocoApi.Models.Keycloak;
using MocoApi.Models.Moco.Dto;
using FastEndpoints;
using MocoApi.Models.Moco.Resource;
using Moco.Api.Models.Moco.Dto;

namespace MocoApi.Endpoints.Charge
{
    public class UpdateChargeEndpoint: Endpoint<UpdateChargeRequest,UpdateChargeResponse>
    {
        public override void Configure()
        {
            Put("/charge");
            Summary(s =>
            {
                s.Summary = "Updates Charge Data";
                s.Description = "Updates ";
                s.ExampleRequest = new UpdateChargeRequest { ChargeUDto = new ChargeUDto { ChargeName = "test", Id = 1} };
                s.ResponseExamples[200] = new UpdateChargeResponse { Success = true };
                s.Responses[200] = "Returns true";
                s.Responses[403] = "Return false";
            });
        }
        public async override Task HandleAsync(UpdateChargeRequest req, CancellationToken ct)
        {
            using(var dbContext = new MoCoContext())
            {
                await req.ChargeUDto.Update(dbContext);
                await dbContext.SaveChangesAsync();
            }

            await SendAsync(new UpdateChargeResponse { Success = true });
        }
    }

    public record ChargeUDto
    {
        public int Id { get; set; }
        public string ChargeName { get; set; }
        public double Value { get; set; }
        public int BudgetId { get; set; }
        public int CostInspectionId { get; set; }
    }

    public record UpdateChargeRequest
    {
        [FromClaim("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")]
        public string? UserId { get; set; }
        public required ChargeUDto ChargeUDto { get; set; }
    }
    public record UpdateChargeResponse
    {
        public bool Success { get; set; } 
    }
}
