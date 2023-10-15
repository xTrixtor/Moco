using FastApiTest.Extensions;
using FastApiTest.Models.Moco.Dto;
using FastEndpoints;

namespace FastApiTest.Endpoints.Charge
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
                s.ResponseExamples[200] = new CreateUserResponse { Success = true };
                s.Responses[200] = "Returns true";
                s.Responses[403] = "Return false";
            });
        }

        public async override Task HandleAsync(CreateChargeRequest req, CancellationToken ct)
        {
            using(var dbContext = new MoCoContext())
            {
                var charge = await req.CChargeDto.PrepareAddAsync(dbContext);
                await dbContext.SaveChangesAsync();
            }

            await SendAsync(new CreateChargeRespone { Success = true });
        }
    }
    public record CreateChargeRequest
    {
        public required ChargeDto CChargeDto { get; set; }
    }

    public record CreateChargeRespone
    {
        public bool Success { get; set; }
    }
}
