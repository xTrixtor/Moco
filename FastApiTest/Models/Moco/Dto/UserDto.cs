using MocoApi.Models.Moco.Resource;

namespace MocoApi.Models.Moco.Dto
{
    public class UserDto
    {
        public UserDto()
        {
                
        }

        public UserDto(User p)
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
