using FastApiTest.DataStore;
using FastApiTest.Models.Keycloak;
using FastEndpoints;

public class MyEndpoint : Endpoint<CreateUserRequest, CreateUserResponse>
{
    private readonly IConfiguration conf;
    private readonly KeycloakServices keycloakServices;

    public MyEndpoint(IConfiguration conf, KeycloakServices keycloakServices)
    {
        this.conf = conf;
        this.keycloakServices = keycloakServices;
    }

    public override void Configure()
    {
        Post("/user");
        AllowAnonymous();
        Throttle(
                hitLimit: 10,
                durationSeconds: 60,
                headerName: "x-create-user" // this is optional
            );
        Credential[] exampleCredentials = { new Credential { type = "password", value = "123", temporary = false } };
        
        Summary(s =>
        {
            s.Summary = "Create Keycloak User";
            s.Description = "Send Userdata to Keycloak to create a new User in the realm";
            s.ExampleRequest = new CreateUserRequest { User = new KeycloakUser { username = "username", enabled = true, credentials = exampleCredentials } };
            s.ResponseExamples[200] = new CreateUserResponse { Success = true};
            s.Responses[200] = "Returns true";
            s.Responses[403] = "Return false";
        });
    }

    public override async Task HandleAsync(CreateUserRequest req, CancellationToken ct)
    {
        var keycloakSettings = conf.GetRequiredSection($"{AppsettingsSection.Keycloak}").Get<KeycloakSettings>();
        if (keycloakSettings is null) ThrowError("Couldnt load Keycloak settings");

        var accessToken = await keycloakServices.GetAccessTokenAsync(keycloakSettings.Realm_Master_Username, keycloakSettings.Realm_Master_Password, keycloakSettings);

        var userCreatedBool = false;
        try
        {
            userCreatedBool = await keycloakServices.CreateUserAsync(req.User, accessToken, keycloakSettings);
        }
        catch (Exception e)
        {
            ThrowError(e.Message);
        }
        await SendAsync(new CreateUserResponse { Success = userCreatedBool });
    }
    
}

public record CreateUserRequest
{
    public KeycloakUser User { get; set; }
    
}

public record CreateUserResponse
{
    public bool Success { get; set; }
}

