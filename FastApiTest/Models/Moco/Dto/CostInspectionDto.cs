using Moco.Api.Endpoints.CostInspection;
using Moco.Api.Models.Moco.Resource;
using MocoApi.Extensions;
using MocoApi.Models.Moco.Dto;
using MocoApi.Models.Moco.Resource;
using Newtonsoft.Json;

namespace Moco.Api.Models.Moco.Dto
{
    public class CostInspectionDto
    {
        public CostInspectionDto()
        {
            
        }
        public CostInspectionDto(CostInspection db, bool firstCreation = true)
        {
            if(firstCreation)
            {
                this.Id = db.Id;
                this.UserYearMonthKey = db.UserYearMonthKey;
                this.CreatedAt = db.CreatedAt;
                this.CreatedAt = db.CreatedAt;
                this.FixedCostChecklist = JsonConvert.DeserializeObject<CheckableFixedCostDto[]>(db.MonthlyFixedcostsJson);
                this.MonthlyBudgets = db.MonthlyBudgets.ToList().Select(x => x.asDto()).ToArray();
                this.Credits = db.Credits.ToList().Select(x => x.asDto()).ToArray();
            }
            else
            {
                this.Id = db.Id;
                this.UserYearMonthKey = db.UserYearMonthKey;
                this.CreatedAt = db.CreatedAt;
                this.CreatedAt = db.CreatedAt;
            }
        }

        public int Id { get; set; }
        public string UserYearMonthKey { get; set; }
        public CheckableFixedCostDto[]? FixedCostChecklist { get; set; }
        public MonthlyBudgetDto[]? MonthlyBudgets { get; set; }
        public CreditDto[] Credits { get; set; }
        public DateTime CreatedAt { get; set; }
    }
    
    
}
