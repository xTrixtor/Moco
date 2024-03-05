using FastEndpoints;
using Moco.Api.Models.Moco.Dto;
using MocoApi.Endpoints.Revenue;
using MocoApi.Extensions;

namespace Moco.Api.Endpoints.Credit
{
    public class CreateCreditEndpoint : Endpoint<CreateCreditRequest, CreateCreditResponse>
    {
        public override void Configure()
        {
            Post("/credit");
            Policies("User");
        }

        public async override Task HandleAsync(CreateCreditRequest req, CancellationToken ct)
        {
            using (var dbContext = new MoCoContext())
            {
                var credit = await req.CreditCDto.PrepareAddAsync(dbContext);
                dbContext.SaveChanges();

                await SendAsync(new CreateCreditResponse { CreditDto = credit.asDto() });
            }

        }
    }
    public record CreateCreditRequest
    {
        [FromClaim("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")]
        public string UserId { get; set; }
        public required CreditCDto CreditCDto { get; set; }
    }
    public record CreateCreditResponse
    {
        public CreditDto CreditDto { get; set; }
    }
    public record CreditCDto
    {
        public string Name { get; set; }
        public double Value { get; set; }
        public int CostInspectionId { get; set; }
    }
}
