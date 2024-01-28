using FastEndpoints;
using Microsoft.EntityFrameworkCore;
using Moco.Api.Factories.Db;
using Moco.Api.Models.Moco.Dto;
using MocoApi.Extensions;
using System.Text;
using Newtonsoft.Json;
using MocoApi.Models.Moco.Resource;

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
                var groupCosts = dbContext.GroupCosts.ToList().Where(x => x.UserId == req.UserId).Select(x => x.asDto()).ToArray();

                var checkableFixcost = groupCosts.SelectMany(x => x.FixedCosts).Select((x,key) => x.toCheckable(key)).ToArray();
                var checkableFixcostJson = JsonConvert.SerializeObject(checkableFixcost);

                var revenues = dbContext.Revenue.Where(x => x.UserId == req.UserId).ToList();
                var credit = revenues.Select((x, key) => new CreditDto { Key = key, Name = x.CompanyName, Value = x.Value }).ToArray();
                var creditJson = JsonConvert.SerializeObject(credit);   

                var newCostInspection = new MocoApi.Models.Moco.Resource.CostInspection { UserYearMonthKey = userYearMonthKey,MonthlyFixedcostsJson = checkableFixcostJson, MonthlyCreditJson= creditJson, CreatedAt = DateTime.Now };
                dbContext.CostInspections.Add(newCostInspection);

                await dbContext.SaveChangesAsync();
            }
            await SendAsync(new CostInspectionCResponse { Success = true });
        }
    }

    public record CostInspectionCRequest
    {
        [FromClaim("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")]
        public string? UserId { get; set; }
        public int MonthNumber { get; set; }
        public int Year { get; set; }
    }

    public record CostInspectionCResponse
    {
        public bool Success { get; set; }
    }
}
