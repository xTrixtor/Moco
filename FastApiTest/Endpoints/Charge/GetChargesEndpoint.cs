using MocoApi.Extensions;
using MocoApi.Models.Moco.Dto;
using FastEndpoints;

namespace MocoApi.Endpoints.Charge
{
    public class GetBudgetsEndpoint: Endpoint<GetChargesRequest,GetChargesResponse>
    {
        public override void Configure()
        {
            Get("/charge");
            Policies("User");
        }
        public async override Task HandleAsync(GetChargesRequest req, CancellationToken ct)
        {
            using(var dbContext = new MoCoContext())
            {
                try
                {
                    var charges = dbContext.Charges.ToList().Select(x => x.asDto()).ToList();
                    await SendAsync(new GetChargesResponse { Charges = charges });
                }
                catch (Exception)
                {
                    ThrowError("Charges couldnt not be loaded");
                }
            }
        }
    }

    public record GetChargesRequest
    {
        [FromClaim("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")]
        public string UserId { get; set; }
    }

    public record GetChargesResponse
    {
        public required IEnumerable<ChargeDto> Charges { get; set; }
    }
}
