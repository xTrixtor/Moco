using FastEndpoints;
using Microsoft.EntityFrameworkCore;
using Moco.Api.Endpoints.GroupCost;
using Moco.Api.Factories.Db;
using Moco.Api.Models.Moco.Dto;
using Moco.Api.Models.Moco.Resource;
using MocoApi.Extensions;

namespace Moco.Api.Endpoints.CostInspection
{
    public class GetCostInspectionEndpoint : Endpoint<CostInspectionGRequest, CostInspectionGResponse>
    {
        private readonly MocoContextFactory mocoContextFactory;

        public GetCostInspectionEndpoint(MocoContextFactory mocoContextFactory)
        {
            this.mocoContextFactory = mocoContextFactory;
        }
        public override void Configure()
        {
            Get("/inspection");
            Policies("User");
        }

        public async override Task HandleAsync(CostInspectionGRequest req, CancellationToken ct)
        {
            var userYearMonthKey = $"{req.UserId}-{req.Year}-{req.MonthNumber}";
            try
            {
                using (var dbContext = new MoCoContext())
                {
                    var costInspection = await dbContext.CostInspections.FirstOrDefaultAsync(x => x.UserYearMonthKey == userYearMonthKey);
                    if(costInspection is null) 
                    {
                        await SendAsync(new CostInspectionGResponse { });
                        return;
                    }
                    var count = dbContext.GroupCosts.Where(x => x.UserId == req.UserId).SelectMany(x => x.FixedCosts).Count();
                    var updateable = false; // TODO
                    await SendAsync(new CostInspectionGResponse {CostInspection = costInspection.asDto(), CheackableFixcostsAreUpdateable = updateable});
                }
            }
            catch (Exception)
            {
                ThrowError("CostInspection couldnt not be loaded");
            }
        }
    }

    public record CostInspectionGRequest
    {
        [FromClaim("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")]
        public string UserId { get; set; }
        public int Year { get; set; }
        public int MonthNumber { get; set; }
    }

    public record CostInspectionGResponse
    {
        public CostInspectionDto CostInspection { get; set; }
        public bool CheackableFixcostsAreUpdateable { get; set; }   
    }
}
