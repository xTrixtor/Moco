using Moco.Api.Models.Moco.Resource;

namespace Moco.Api.Models.Moco.Dto
{
    public class DepositRateDto
    {
        public DepositRateDto()
        {
            
        }
        public DepositRateDto(DepositRate depositRate)
        {
            this.Id = depositRate.Id;
            this.Key = depositRate.Key;
            this.Value = depositRate.Value;
            this.SavingMonth = depositRate.SavingMonth;
            this.isPaid = depositRate.isPaid;
        }
        public int Id { get; set; }
        public string Key { get; set; }
        public double Value { get; set; } = 0;
        public bool isPaid { get; set; }
        public DateTime SavingMonth { get; set; }
    }
}
