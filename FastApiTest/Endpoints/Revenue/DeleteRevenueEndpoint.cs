using FastEndpoints;
using MocoApi.Endpoints.Charge;

namespace Moco.Api.Endpoints.Revenue
{
    public class DeleteRevenueEndpoint : Endpoint<DeleteChargesRequest>
    {
        public override void Configure()
        {
            Delete("/revenue/{RevenueId}");
            Policies("User");
        }

        public async override Task HandleAsync(DeleteChargesRequest req, CancellationToken ct)
        {
            using (var dbContext = new MoCoContext())
            {
                try
                {
                    var revenue = dbContext.Revenue.FirstOrDefault(x => x.Id.Equals(req.RevenueId));
                    if (revenue == null)
                        ThrowError("Es wurden kein Gehalt mit dieser Id gefunden");

                    dbContext.Revenue.Remove(revenue);
                    await dbContext.SaveChangesAsync();

                    await SendOkAsync();
                }
                catch (Exception)
                {
                    ThrowError("Revenue couldnt not be loaded");
                }
            }
        }
    }

    public record DeleteChargesRequest
    {
        [FromClaim("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")]
        public string? UserId { get; set; }
        public int RevenueId { get; set; }
    }
}