using FastEndpoints;
using Moco.Api.Endpoints.Credit;

namespace Moco.Api.Endpoints.SavingGoals
{
    public class DeleteSavingGoalEndpoint : Endpoint<DeleteCreditRequest>
    {
        public override void Configure()
        {
            Delete("/savingGoals/{SavingGoalId}");
            Policies("User");
        }

        public async override Task HandleAsync(DeleteCreditRequest req, CancellationToken ct)
        {
            using (var dbContext = new MoCoContext())
            {
                try
                {
                    var savingGoal = dbContext.SavingGoals.FirstOrDefault(x => x.Id.Equals(req.SavingGoalId));
                    if (savingGoal == null)
                        ThrowError("Could not find SavingGoal with given Id");

                    dbContext.SavingGoals.Remove(savingGoal);
                    await dbContext.SaveChangesAsync();

                    await SendOkAsync();
                }
                catch (Exception)
                {
                    ThrowError("SavingGoal couldnt not be loaded");
                }
            }
        }
    }
    public record DeleteCreditRequest
    {
        [FromClaim("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")]
        public string? UserId { get; set; }
        public required int SavingGoalId { get; set; }
    }
}
