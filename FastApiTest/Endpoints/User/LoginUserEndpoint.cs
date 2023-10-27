using FastEndpoints;
using Newtonsoft.Json;
using System.IdentityModel.Tokens.Jwt;

namespace MocoApi.Endpoints.User
{
    public class LoginUserEndpoint : Endpoint<LoginRequest, LoginResponse>
    {
        private readonly IConfiguration configuration;

        private KeycloakSettings keycloakSettings;

        public LoginUserEndpoint(IConfiguration configuration)
        {
            this.configuration = configuration;
        }
        public override void Configure()
        {
            Post("/login");
            AllowAnonymous();
            Throttle(
                hitLimit: 10,
                durationSeconds: 60,
                headerName: "x-login" // this is optional
            );
            Summary(s =>
            {
                s.Summary = "Login into Keycloak";
                s.Description = "Send Userdata to Keycloak login Service to get JWTtoken";
                s.ExampleRequest = new LoginRequest { Username = "nico", Password = "123" };
                s.ResponseExamples[200] = new LoginResponse { Success = true, JWTToken = "asföljasföaskdfjsafsadf231231412" };
                s.Responses[200] = "Returns JWT token";
                s.Responses[403] = "Forbidden";
            });
        }

        public override async Task HandleAsync(LoginRequest req, CancellationToken ct)
        {
            try
            {
                keycloakSettings = configuration.GetRequiredSection($"{AppsettingsSection.Keycloak}").Get<KeycloakSettings>();
            }
            catch (Exception)
            {
                ThrowError("Es konnten keine Daten aus den Appsettings gelesen werden");
            }

            using HttpClient client = new();


            var data = new[] {
                new KeyValuePair<string, string>("grant_type", "password"),
                new KeyValuePair<string, string>("client_id", keycloakSettings.resource),
                new KeyValuePair<string, string>("username", req.Username),
                new KeyValuePair<string, string>("password", req.Password),
            };

            var response = await client.PostAsync(keycloakSettings.BaseURL + keycloakSettings.LoginPath, new FormUrlEncodedContent(data));

            if (!response.IsSuccessStatusCode)
            {
                //return error
            }
            var jsonContent = await response.Content.ReadAsStringAsync();

            var keyCloakResponse = JsonConvert.DeserializeObject<KeyCloakSuccessfullLoginResponse>(jsonContent);

            if (keyCloakResponse.access_token is null) ThrowError("JWT Token ist null");

            var handler = new JwtSecurityTokenHandler();
            var jwtSecurityToken = handler.ReadJwtToken(keyCloakResponse.access_token);

            var userId = jwtSecurityToken.Claims.First(claim => claim.Type == "sub").Value;
            var timestampString = jwtSecurityToken.Claims.First(claim => claim.Type == "exp").Value;
            var expireDate = new DateTime();
            expireDate = expireDate.AddSeconds(long.Parse(timestampString)).AddHours(2);
            await SendAsync(new()
            {
                UserId = userId,
                JWTToken = keyCloakResponse.access_token,
                Success = true,
                ExpireTime = expireDate,
            });
        }
    }

    public record LoginRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }

    public record LoginResponse
    {
        public string UserId { get; set; }
        public bool Success { get; set; }
        public string JWTToken { get; set; }
        public DateTime ExpireTime { get; set; }
    }

    public record KeyCloakSuccessfullLoginResponse
    {
        public string access_token { get; set; }
        public int expires_in { get; set; }
        public int refresh_expires_in { get; set; }
        public string refresh_token { get; set; }
        public string token_type { get; set; }
    }
}
