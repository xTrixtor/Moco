using FastEndpoints;
using Keycloak.AuthServices.Sdk.Admin.Models;
using MocoApi.DataStore;

namespace MocoApi.Endpoints.User
{
    public class RefreshAuthTokenEndpoint: Endpoint<RefreshAuthTokenRequest, RefreshAuthTokenResponse>
    {
        private readonly KeycloakServices _keycloakServices;

        public RefreshAuthTokenEndpoint(KeycloakServices keycloakServices)
        {
            this._keycloakServices = keycloakServices;
        }
        public override void Configure()
        {
            Post("/refresh");
            AllowAnonymous();
            Throttle(
                hitLimit: 20,
                durationSeconds: 30,
                headerName: "x-refresh" // this is optional
            );
            Summary(s =>
            {
                s.Summary = "Refresh Auth Token with refreshToken";
                s.Description = "Takes the refreshToken to get a new AuthToken";
                s.Responses[200] = "Returns JWT token";
                s.Responses[403] = "Forbidden";
            });
        }

        public async override Task HandleAsync(RefreshAuthTokenRequest req, CancellationToken ct)
        {
            var res = await _keycloakServices.GetTokenWithRefreshTokenAsync(req.RefreshToken);
            await SendAsync(new RefreshAuthTokenResponse()
            {
                JWTToken = res.access_token,
                RefreshToken = res.refresh_token,
                Success = true,
            });
        }
    }

    public record RefreshAuthTokenRequest
    {
        public string RefreshToken { get; set; }
    }

    public record RefreshAuthTokenResponse
    {
        public bool Success { get; set; }
        public string JWTToken { get; set; }
        public string RefreshToken { get; set; }
    }
}
