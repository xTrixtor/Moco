using FastEndpoints;
using Moco.Api.Models.Moco.Dto;
using MocoApi.Endpoints.Budget;
using MocoApi.Endpoints.Revenue;
using MocoApi.Extensions;
using MocoApi.Models.Moco.Dto;
using Newtonsoft.Json;

namespace Moco.Api.Endpoints.SavingGoals
{
    public class CreateSavingGoalEndpoint : Endpoint<SavingGoalCDto, SavingGoalCResponse>
    {
        public override void Configure()
        {
            Post("/savingGoals");
            Policies("User");
        }

        public async override Task HandleAsync(SavingGoalCDto req, CancellationToken ct)
        {
            var deposits = new List<DepositRateDto>();
            for (DateOnly month = req.StartDate; month < req.EndDate; month = month.AddMonths(1))
            {
                var despositRate = new DepositRateDto { Key = $"{month.Month}-{month.Year}", Value = 0 };
                deposits.Add(despositRate); 
            }
            var depositsJson = JsonConvert.SerializeObject(deposits.ToArray());

            using (var dbContext = new MoCoContext())
            {
                var savingGoal = await req.PrepareAddAsync(depositsJson, dbContext);
                dbContext.SaveChanges();
                await SendAsync(new SavingGoalCResponse { SavingGoalDto = savingGoal.asDto() });
            }
        }
    }

    public record SavingGoalCDto
    {
        [FromClaim("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")]
        public string UserId { get; set; }
        public required string Name { get; set; }
        public required double Value { get; set; }
        public required double DepositRate { get; set; } = 0;
        public required DateOnly StartDate { get; set; }
        public required DateOnly EndDate { get; set; }
    }
    public record SavingGoalCResponse
    {
        public SavingGoalDto SavingGoalDto { get; set; }
    }
}
