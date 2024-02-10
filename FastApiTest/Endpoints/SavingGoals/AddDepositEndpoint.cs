﻿using FastEndpoints;
using Moco.Api.Models.Moco.Dto;
using MocoApi.Extensions;
using Newtonsoft.Json;

namespace Moco.Api.Endpoints.SavingGoals
{
    public class AddDepositEndpoint : Endpoint<DepositsUDto, UpdateDepositsResponse>
    {
        public override void Configure()
        {
            Put("/savingGoals/deposits");
            Policies("User");
        }

        public async override Task HandleAsync(DepositsUDto req, CancellationToken ct)
        {
            using (var dbContext = new MoCoContext())
            {
                var savingGoal = dbContext.SavingGoals.FirstOrDefault(x => x.Id == req.SavingGoalId);

                var deposits = savingGoal.asDto().DepositRates;
                foreach (var deposit in deposits)
                {
                    if (deposit.Key == req.DepositUDto.Key)
                        deposit.Value = req.DepositUDto.Value;  
                }
                savingGoal.DepositsJson = JsonConvert.SerializeObject(deposits);
                dbContext.SaveChanges();

                await SendAsync(new UpdateDepositsResponse { Deposits = deposits });
            }
        }
    }

    public record DepositsUDto
    {
        [FromClaim("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")]
        public string UserId { get; set; }
        
        public required int SavingGoalId { get; set; }
        public DepositRateDto DepositUDto { get; set; }
    }
    public record UpdateDepositsResponse
    {
        public DepositRateDto[] Deposits { get; set; }
    }
}
