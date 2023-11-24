using FastEndpoints;
using MocoApi.Extensions;
using MocoApi.Models.Moco.Dto;
using MocoApi.Models.Moco.Resource;

namespace MocoApi.Endpoints.Charge
{
    public class GetChargesByTimeInterval: Endpoint<GetChargesByTimeIntervalRequest, IEnumerable<ChargeDto>>
    {
        public override void Configure()
        {
            Get("/charge/byTimeInterval");
            Policies("User");
            Description(x => x.WithName("GetChargesByInterval"));
        }

        public async override Task HandleAsync(GetChargesByTimeIntervalRequest req, CancellationToken ct)
        {
            using (var dbContext = new MoCoContext())
            {
                try
                {
                    var charges = dbContext.Charges.ToList().Where(x => x.TimeInterval.Equals((TimeInterval)req.TimeIntervalKey)).Select(x => x.asDto()).ToList();
                    await SendAsync(charges);
                }
                catch (Exception)
                {
                    ThrowError("Charges couldnt not be loaded");
                }
            }
        }
    }

    public record GetChargesByTimeIntervalRequest
    {
        [FromClaim("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")]
        public string? UserId { get; set; }
        public int TimeIntervalKey { get; set; }
    }
}
