using MocoApi.Models.Moco.Dto;
using MocoApi.Models.Moco.Resource;

namespace Moco.Api.Models.Moco.Dto
{
    public class CheckableBudgetsDto
    {
        public BudgetDto Budget { get; set; }
        public ChargeDto[] Charges { get; set; }
    }
}
