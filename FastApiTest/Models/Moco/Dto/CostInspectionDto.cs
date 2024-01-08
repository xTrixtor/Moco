using Moco.Api.Extensions;
using Moco.Api.Models.Moco.Resource;
using MocoApi.Extensions;
using MocoApi.Models.Moco.Dto;

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
                this.FixedCostChecklist = db.CheckableFixedCosts?.Select(x => x.asDto()).ToArray();
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
        public ChargeDto[]? BudgetCharges { get; set; }
        public DateTime CreatedAt { get; set; }
    }
    
    
}
