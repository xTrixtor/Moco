using MocoApi.Extensions;
using MocoApi.Models.Moco.Dto;
using FastEndpoints;
using MocoApi.Models.Moco.Resource;

namespace MocoApi.Endpoints.Charge
{
    public class CreateChargeEndpoint: Endpoint<CreateChargeRequest, CreateChargeRespone>
    {
        public override void Configure()
        {
            Post("/charge");
            Summary(s =>
            {
                s.Summary = "Create Charge for User";
                s.Description = "Send Userdata to Keycloak to create a new User in the realm";
                s.Responses[200] = "Returns true";
                s.Responses[403] = "Return false";
            });
        }

        public async override Task HandleAsync(CreateChargeRequest req, CancellationToken ct)
        {
            using(var dbContext = new MoCoContext())
            {
                var charge = await req.ChargeDto.PrepareAddAsync(dbContext, req.UserId);
                await dbContext.SaveChangesAsync();
            }

            await SendAsync(new CreateChargeRespone { Success = true });
        }
    }
    public record CreateChargeRequest
    {
        [FromClaim("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")]
        public string? UserId { get; set; }
        public required ChargeDto ChargeDto { get; set; }
    }

    public record CreateChargeRespone
    {
        public bool Success { get; set; }
    }
}
