using MocoApi.DataStore;
using MocoApi.Models.Keycloak;
using FastEndpoints;
using MocoApi.Endpoints.User;
using System.IdentityModel.Tokens.Jwt;
using MocoApi.Models.Moco.Dto;
using MocoApi.Extensions;

public class CreateUserEndpoint : Endpoint<CreateUserRequest, CreateUserResponse>
{
    private readonly IConfiguration conf;
    private readonly KeycloakServices keycloakServices;

    public CreateUserEndpoint(IConfiguration conf, KeycloakServices keycloakServices)
    {
        this.conf = conf;
        this.keycloakServices = keycloakServices;
    }

    public override void Configure()
    {
        Post("/user");
        AllowAnonymous();
        Credential[] exampleCredentials = { new Credential { type = "password", value = "123", temporary = false } };
        
        Summary(s =>
        {
            s.Summary = "Create Keycloak User";
            s.Description = "Send Userdata to Keycloak to create a new User in the realm";
            s.ExampleRequest = new CreateUserRequest { User = new KeycloakUser { username = "username", enabled = true, credentials = exampleCredentials, email="email@mail.com", firstName="NIco", lastName="Böhner"} };
            s.Responses[200] = "Returns true";
            s.Responses[403] = "Return false";
        });
    }

    public override async Task HandleAsync(CreateUserRequest req, CancellationToken ct)
    {
        var keycloakSettings = conf.GetRequiredSection($"{AppsettingsSection.Keycloak}").Get<KeycloakSettings>();
        if (keycloakSettings is null) ThrowError("Couldnt load Keycloak settings");

        var accessToken = await keycloakServices.AdminLoginAsync();

        try
        {
            var res = await keycloakServices.CreateUserAsync(req.User, accessToken, keycloakSettings);

            var handler = new JwtSecurityTokenHandler();
            var jwtSecurityToken = handler.ReadJwtToken(res.access_token);

            var userId = jwtSecurityToken.Claims.First(claim => claim.Type == "sub").Value;

            var personDto = new UserDto
            {
                KeycloakUserId = userId,
                Email = req.User.email,
                Username = req.User.username,
                Firstname = req.User.firstName,
                LastName = req.User.lastName,   
                CreatedAt = DateTime.UtcNow,
            }; 
            using (var dbContext = new MoCoContext())
            {
                await personDto.PrepareAddAsync(dbContext);
                await dbContext.SaveChangesAsync();    
            }
            await SendAsync(new CreateUserResponse { KeycloakResponse = res, PersonInfo = personDto});   
        }
        catch (Exception e)
        {
            ThrowError(e.Message);
        }
    }
    
}

public record CreateUserRequest
{
    public KeycloakUser User { get; set; }
}

public record CreateUserResponse
{
    public required KeyCloakSuccessfullLoginResponse KeycloakResponse { get; set; }
    public required UserDto PersonInfo { get; set; }
}