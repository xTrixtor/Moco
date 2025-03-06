using MocoApi.Extensions;
using FastEndpoints;
using Moco.Api.Factories.Db;
using MocoApi.Models.Moco.Dto;

namespace MocoApi.Endpoints.Charge
{
    public class CreateChargeEndpoint: Endpoint<CreateChargeRequest, CreateChargeRespone>
    {
        private readonly MocoContextFactory mocoContextFactory;

        public CreateChargeEndpoint(MocoContextFactory mocoContextFactory)
        {
            this.mocoContextFactory = mocoContextFactory;
        }
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
            Policies("User");
        }

        public async override Task HandleAsync(CreateChargeRequest req, CancellationToken ct)
        {
            ChargeDto createdChargeDto;
            using(var dbContext = mocoContextFactory.CreateMocoContext())
            {
                var charge = await req.ChargeCDto.PrepareAddAsync(dbContext);
                await dbContext.SaveChangesAsync();
                dbContext.SaveChanges();

                createdChargeDto = charge.asDto();
            }

            await SendAsync(new CreateChargeRespone { CreatedCharge = createdChargeDto });
        }
    }
    public record CreateChargeRequest
    {
        [FromClaim("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")]
        public string? UserId { get; set; }
        public required ChargeCDto ChargeCDto { get; set; }
    }

    public record CreateChargeRespone
    {
        public ChargeDto CreatedCharge { get; set; }
    }

    public record ChargeCDto
    {
        public required string Name { get; set; }
        public required double Value { get; set; }
        public required int MonthlyBudgetId { get; set; }
    }
}
