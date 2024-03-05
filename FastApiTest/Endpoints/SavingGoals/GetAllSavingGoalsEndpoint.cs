using FastEndpoints;
using Microsoft.EntityFrameworkCore;
using Moco.Api.Models.Moco.Dto;
using MocoApi.Extensions;

namespace Moco.Api.Endpoints.SavingGoals
{
    public class GetAllSavingGoalsEndpoint : Endpoint<GetAllSavingGoalsRequest, GetAllSavingGoalsResponse>
    {
        public override void Configure()
        {
            Get("/savingGoals");
            Policies("User");
        }

        public async override Task HandleAsync(GetAllSavingGoalsRequest req, CancellationToken ct)
        {
            using (var dbContext = new MoCoContext())
            {
                var savingGoals = dbContext.SavingGoals.Where(x => x.UserId == req.UserId).ToList().Select(x => x.asDto()).ToArray();
                await SendAsync(new GetAllSavingGoalsResponse { AllSavingGoals = savingGoals });
            }
        }
    }
    public record GetAllSavingGoalsRequest
    {
        [FromClaim("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")]
        public string UserId { get; set; }

    }
    public record GetAllSavingGoalsResponse
    {
        public SavingGoalDto[] AllSavingGoals { get; set; }
    }
}
