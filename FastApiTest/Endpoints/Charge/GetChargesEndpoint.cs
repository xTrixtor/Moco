using FastApiTest.Extensions;
using FastApiTest.Models.Moco.Dto;
using FastEndpoints;

namespace FastApiTest.Endpoints.Charge
{
    public class GetChargesEndpoint: EndpointWithoutRequest<GetChargesResponse>
    {
        public override void Configure()
        {
            Get("/charge");
            AllowAnonymous();
        }
        public async override Task HandleAsync(CancellationToken ct)
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

    public record GetChargesResponse
    {
        public required IEnumerable<ChargeDto> Charges { get; set; }
    }
}
