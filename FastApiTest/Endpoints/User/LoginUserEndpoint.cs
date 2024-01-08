using FastEndpoints;
using Microsoft.EntityFrameworkCore;
using Moco.Api.Factories.Db;
using MocoApi.DataStore;
using MocoApi.Extensions;
using MocoApi.Models.Moco.Dto;
using Newtonsoft.Json;
using System.IdentityModel.Tokens.Jwt;

namespace MocoApi.Endpoints.User
{
    public class LoginUserEndpoint : Endpoint<LoginRequest, LoginResponse>
    {
        private readonly IConfiguration configuration;
        private readonly KeycloakServices _keycloakServices;
        private readonly MocoContextFactory mocoContextFactory;
        private KeycloakSettings keycloakSettings;

        public LoginUserEndpoint(IConfiguration configuration, KeycloakServices keycloakServices, MocoContextFactory mocoContextFactory)
        {
            this.configuration = configuration;
            this._keycloakServices = keycloakServices;
            this.mocoContextFactory = mocoContextFactory;
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

            var keyCloakResponse = await _keycloakServices.GetTokensAsync(req.Username, req.Password, keycloakSettings);

            if (keyCloakResponse.access_token is null) ThrowError("JWT Token ist null");
            if (keyCloakResponse.refresh_token is null) ThrowError("Refresh Token ist null");

            var handler = new JwtSecurityTokenHandler();
            var jwtSecurityToken = handler.ReadJwtToken(keyCloakResponse.access_token);

            var userId = jwtSecurityToken.Claims.First(claim => claim.Type == "sub").Value;
            var timestampString = jwtSecurityToken.Claims.First(claim => claim.Type == "exp").Value;
            var expireDate = new DateTime();
            expireDate = expireDate.AddSeconds(long.Parse(timestampString)).AddHours(2);

            using (var context = mocoContextFactory.CreateMocoContext())
            {
                var userdb = await context.Users.FirstOrDefaultAsync(x => x.KeycloakUserId == userId);
                await SendAsync(new()
                {
                    User = userdb.asDto(),
                    JWTToken = keyCloakResponse.access_token,
                    RefreshToken = keyCloakResponse.refresh_token,
                    Success = true,
                    ExpireTime = expireDate,
                });;
            }
            
        }
    }

    public record LoginRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }

    public record LoginResponse
    {
        public UserDto User { get; set; }
        public bool Success { get; set; }
        public string JWTToken { get; set; }
        public string RefreshToken { get; set; }
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
