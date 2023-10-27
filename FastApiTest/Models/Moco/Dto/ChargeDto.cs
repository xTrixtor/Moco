using MocoApi.Models.Moco.Resource;

namespace MocoApi.Models.Moco.Dto
{
    public class ChargeDto
    {
        public ChargeDto()
        {

        }
        public ChargeDto(Charge charge)
        {
            Id = charge.Id;
            ChargeName = charge.ChargeName;
            Catecory = charge.Catecory;
            Value = charge.Value;
            TimeInterval = charge.TimeInterval;
            UserId = charge.UserId;
        }
        public int Id { get; set; }
        public string ChargeName { get; set; }
        public double Value { get; set; }
        public string UserId { get; set; }
        public Catecory Catecory { get; set; }
        public TimeInterval TimeInterval { get; set; }
    }
}
