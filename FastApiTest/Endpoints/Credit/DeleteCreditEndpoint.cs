﻿using FastEndpoints;

namespace Moco.Api.Endpoints.Credit
{
    public class DeleteCreditEndpoint : Endpoint<DeleteCreditRequest>
    {
        public override void Configure()
        {
            Delete("/credit/{CreditId}");
            Policies("User");
        }

        public async override Task HandleAsync(DeleteCreditRequest req, CancellationToken ct)
        {
            using (var dbContext = new MoCoContext())
            {
                try
                {
                    var credit = dbContext.Credits.FirstOrDefault(x => x.Id.Equals(req.CreditId));
                    if (credit == null)
                        ThrowError("Could not find Credit with given Id");

                    dbContext.Credits.Remove(credit);
                    await dbContext.SaveChangesAsync();

                    await SendOkAsync();
                }
                catch (Exception)
                {
                    ThrowError("Credit couldnt not be loaded");
                }
            }
        }
    }
    public record DeleteCreditRequest
    {
        [FromClaim("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")]
        public string? UserId { get; set; }
        public required int CreditId { get; set; }
    }
}
