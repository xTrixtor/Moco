﻿using FastEndpoints;
using Microsoft.EntityFrameworkCore;
using Moco.Api.Factories.Db;

namespace Moco.Api.Endpoints.FixedCost
{
    public class DeleteFixedCostEndpoint : Endpoint<DeleteFixedCostRequest>
    {
        private readonly MocoContextFactory mocoContextFactory;

        public DeleteFixedCostEndpoint(MocoContextFactory mocoContextFactory)
        {
            this.mocoContextFactory = mocoContextFactory;
        }
        public override void Configure()
        {
            Delete("/fixedCost/{FixedCostId}");
            Policies("User");
        }

        public async override Task HandleAsync(DeleteFixedCostRequest req, CancellationToken ct)
        {
            using(var dbContext = mocoContextFactory.CreateMocoContext())
            {
                try
                {
                    var selectedFixedCost = await dbContext.FixedCosts.FirstOrDefaultAsync(x => x.Id.Equals(req.FixedCostId));
                    if (selectedFixedCost == null)
                        ThrowError("Could not find Fixed Cost with given Id");

                    dbContext.FixedCosts.Remove(selectedFixedCost);
                    var savingGoalGroupCost = dbContext.GroupCosts.FirstOrDefault(x => x.Name.Equals("Sparziel"));

                    if (savingGoalGroupCost is null)
                    {
                        var newGroupCost = new Models.Moco.Resource.GroupCost { Name = "Sparziel", UserId = req.UserId };
                        dbContext.GroupCosts.Add(newGroupCost);
                        await dbContext.SaveChangesAsync();
                        savingGoalGroupCost = newGroupCost;
                    }

                    if (selectedFixedCost.GroupCostId == savingGoalGroupCost.Id)
                    {
                        var savingGoal = await dbContext.SavingGoals.FirstOrDefaultAsync(x => x.Name == selectedFixedCost.Name);
                        dbContext.SavingGoals.Remove(savingGoal);
                    }

                    await dbContext.SaveChangesAsync();
                    await SendOkAsync();
                }
                catch (Exception)
                {
                    ThrowError("Fixed Cost couldnt not be loaded");
                }
            }
        }
    }
    public record DeleteFixedCostRequest
    {
        [FromClaim("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")]
        public string? UserId { get; set; }
        public int FixedCostId { get; set; }
    }
}
