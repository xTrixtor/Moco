using FastEndpoints;
using Microsoft.EntityFrameworkCore;
using Moco.Api.Endpoints.GroupCost;
using Moco.Api.Factories.Db;
using Moco.Api.Models.Moco.Dto;
using Moco.Api.Models.Moco.Resource;
using MocoApi.Extensions;
using System.Net.Http;
using System.Text.Json.Nodes;
using System.Text;
using System;
using Newtonsoft.Json;
using System.Net.Http.Headers;

namespace Moco.Api.Endpoints.CostInspection
{
    public class CreateCostInspectionEndpoint : Endpoint<CostInspectionCRequest, CostInspectionCResponse>
    {
        private readonly MocoContextFactory mocoContextFactory;
        private readonly IHttpClientFactory _httpClientFactory;

        public CreateCostInspectionEndpoint(MocoContextFactory mocoContextFactory, IHttpClientFactory httpClientFactory)
        {
            this.mocoContextFactory = mocoContextFactory;
            this._httpClientFactory = httpClientFactory;
        }
        public override void Configure()
        {
            Post("/inspection");
            Policies("User");
        }

        public async override Task HandleAsync(CostInspectionCRequest req, CancellationToken ct)
        {
            var userYearMonthKey = $"{req.UserId}-{req.Year}-{req.MonthNumber}";
            using (var dbContext = mocoContextFactory.CreateMocoContext())
            {
                var costInspection = await dbContext.CostInspections.FirstOrDefaultAsync(x => x.UserYearMonthKey == userYearMonthKey);
                if (costInspection is not null)
                {
                    await SendAsync(new CostInspectionCResponse { Success = true });
                    return;
                }
            }


            var client = _httpClientFactory.CreateClient();
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", req.Token.Split(" ")[1]);
            var content = new StringContent(JsonConvert.SerializeObject(new CostInspectionIRequest { UserYearMonthKey = userYearMonthKey }), Encoding.UTF8, "application/json");
            var result = client.PostAsync(BaseURL + "api/inspection/initialize", content).Result;

            using (var dbContext = mocoContextFactory.CreateMocoContext())
            {
                var costInspection = await dbContext.CostInspections.FirstAsync(x => x.UserYearMonthKey == userYearMonthKey);
                var groupCosts = dbContext.GroupCosts.ToList().Where(x => x.UserId == req.UserId).Select(x => x.asDto()).ToArray();
                
                foreach (var groupCost in groupCosts)
                {
                    foreach (var fixcost in groupCost.FixedCosts)
                    {
                        fixcost.Add(dbContext, costInspection.Id);
                    }
                }
                await dbContext.SaveChangesAsync();
            }
            await SendAsync(new CostInspectionCResponse { Success = true });
        }
    }

    public record CostInspectionCRequest
    {
        [FromClaim("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")]
        public string? UserId { get; set; }
        [FromHeader("Authorization")]
        public string? Token { get; set; }
        public int MonthNumber { get; set; }
        public int Year { get; set; }
    }

    public record CostInspectionCResponse
    {
        public bool Success { get; set; }
    }
}
