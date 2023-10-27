namespace MocoApi.Models.Moco.Resource
{
    public class Charge
    {
        public int Id { get; set; }
        public required string ChargeName { get; set; }
        public required double Value { get; set; }
        public required string UserId { get; set; }
        public required TimeInterval TimeInterval { get; set; } = TimeInterval.monatlich;
        public required Catecory Catecory { get; set; } = Catecory.Sonstiges;
    }
}