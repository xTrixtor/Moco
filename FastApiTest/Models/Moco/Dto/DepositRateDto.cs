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
            Id = depositRate.Id;
            Key = depositRate.Key;
            Value = depositRate.Value;
            SavingMonth = depositRate.SavingMonth;
        }
        public int Id { get; set; }
        public string Key { get; set; }
        public double Value { get; set; } = 0;
        public DateTime SavingMonth { get; set; }
    }
}
