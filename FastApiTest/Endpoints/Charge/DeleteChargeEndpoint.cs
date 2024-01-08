using FastEndpoints;

namespace MocoApi.Endpoints.Charge
{
    public class DeleteChargeEndpoint : Endpoint<DeleteChargesRequest>
    {
        public override void Configure()
        {
            Delete("/charge/{ChargeId}");
            Policies("User");
        }

        public async override Task HandleAsync(DeleteChargesRequest req, CancellationToken ct)
        {
            using (var dbContext = new MoCoContext())
            {
                try
                {
                    var charge = dbContext.Charges.FirstOrDefault(x => x.Id.Equals(req.ChargeId));
                    if (charge == null)
                        ThrowError("Es wurden keine Kosten mit dieser Id gefunden");

                    dbContext.Charges.Remove(charge);
                    await dbContext.SaveChangesAsync();

                    await SendOkAsync();
                }
                catch (Exception)
                {
                    ThrowError("Charges couldnt not be loaded");
                }
            }
        }
    }

    public record DeleteChargesRequest
    {
        [FromClaim("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")]
        public string? UserId { get; set; }
        public int ChargeId { get; set; }
    }

    
}
