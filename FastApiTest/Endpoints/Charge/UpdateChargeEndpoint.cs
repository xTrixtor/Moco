using MocoApi.Extensions;
using MocoApi.Models.Moco.Dto;
using FastEndpoints;
using MocoApi.Models.Moco.Resource;

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
                s.ExampleRequest = new UpdateChargeRequest { UChargeDto = new ChargeDto { ChargeName = "test", Catecory = Catecory.Vertraglich, Id = 1, TimeInterval = TimeInterval.wöchentlich, UserId = "asdf" } };
                s.ResponseExamples[200] = new UpdateChargeResponse { Success = true };
                s.Responses[200] = "Returns true";
                s.Responses[403] = "Return false";
            });
        }
        public async override Task HandleAsync(UpdateChargeRequest req, CancellationToken ct)
        {
            using(var dbContext = new MoCoContext())
            {
                await req.UChargeDto.Update(dbContext);
                await dbContext.SaveChangesAsync();
            }

            await SendAsync(new UpdateChargeResponse { Success = true });
        }
    }


    public record UpdateChargeRequest
    {
        public required ChargeDto UChargeDto{ get; set; }
    }
    public record UpdateChargeResponse
    {
        public bool Success { get; set; } 
    }
}
