namespace MocoApi.Models.Moco.Resource
{
    public class Person
    {

        public int Id { get; set; }
        public required string KeycloakUserId { get; set; }
        public required string Username { get; set; }
        public required string Firstname { get; set; }
        public required string LastName { get; set; }
        public required string Email { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
