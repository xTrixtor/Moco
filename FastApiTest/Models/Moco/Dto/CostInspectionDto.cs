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
                this.BudgetCharges = db.BudgetCharges?.Select(x => x.asDto()).ToArray();
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
        public CreditDto[] Credits { get; set; }
        public ChargeDto[]? BudgetCharges { get; set; }
        public DateTime CreatedAt { get; set; }
    }
    
    
}
