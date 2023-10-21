using MocoApi.Models.Moco.Resource;

namespace MocoApi.Models.Moco.Dto
{
    public class PersonDto
    {
        public PersonDto()
        {
                
        }

        public PersonDto(Person p)
        {
            Id = p.Id;
            KeycloakUserId = p.KeycloakUserId;
            Firstname = p.Firstname;
            LastName = p.LastName;
            Email = p.Email;
            CreatedAt = p.CreatedAt;
        }

        public int Id { get; set; }
        public string KeycloakUserId { get; set; }
        public string Username { get; set; }
        public string Firstname { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
