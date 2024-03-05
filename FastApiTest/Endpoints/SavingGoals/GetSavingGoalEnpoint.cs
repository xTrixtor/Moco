using FastEndpoints;
using Microsoft.EntityFrameworkCore;
using Moco.Api.Models.Moco.Dto;
using MocoApi.Extensions;
using Newtonsoft.Json;

namespace Moco.Api.Endpoints.SavingGoals
{
    public class GetSavingGoalEnpoint : Endpoint<GetSavingGoalRequest, GetSavingGoalResponse>
    {
        public override void Configure()
        {
            Get("/savingGoals/{SavingGoalId}");
            Policies("User");
        }

        public async override Task HandleAsync(GetSavingGoalRequest req, CancellationToken ct)
        {
            using (var dbContext = new MoCoContext())
            {
                var savingGoal = await dbContext.SavingGoals.FirstOrDefaultAsync(x => x.Id == req.SavingGoalId && x.UserId == req.UserId);
                await SendAsync(new GetSavingGoalResponse { SavingGoalDto = savingGoal.asDto() });
            }
        }
    }

    public record GetSavingGoalRequest
    {
        [FromClaim("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")]
        public string UserId { get; set; }

        public int SavingGoalId { get; set; }
    }
    public record GetSavingGoalResponse
    {
        public SavingGoalDto SavingGoalDto { get; set; }
    }
}
