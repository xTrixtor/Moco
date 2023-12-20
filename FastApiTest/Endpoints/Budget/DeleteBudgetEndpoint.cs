using FastEndpoints;


namespace MocoApi.Endpoints.Budget
{
    public class DeleteBudgetEndpoint: Endpoint<DeleteBudgetRequest>
    {
        public override void Configure()
        {
            Delete("/budget/{BudgetId}");
            Policies("User");
        }

        public async override Task HandleAsync(DeleteBudgetRequest req, CancellationToken ct)
        {
            using (var dbContext = new MoCoContext())
            {
                try
                {
                    var budget = dbContext.Budgets.FirstOrDefault(x => x.Id.Equals(req.BudgetId));
                    if (budget == null)
                        ThrowError("Could not find Budget with given Id");

                    dbContext.Budgets.Remove(budget);
                    await dbContext.SaveChangesAsync();

                    await SendOkAsync();
                }
                catch (Exception)
                {
                    ThrowError("Budget couldnt not be loaded");
                }
            }
        }

    }

    public record DeleteBudgetRequest
    {
        [FromClaim("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")]
        public string? UserId { get; set; }
        public required int BudgetId { get; set; }
    }

}
