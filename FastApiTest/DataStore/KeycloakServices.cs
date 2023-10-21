using Newtonsoft.Json;
using System.Net.Http.Headers;
using System.Text;
using MocoApi.Models.Keycloak;
using MocoApi.Endpoints.User;
using System.Net;

namespace MocoApi.DataStore
{
    public class KeycloakServices
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IConfiguration _conf;

        public KeycloakServices(IHttpClientFactory httpClientFactory, IConfiguration conf)
        {
            this._httpClientFactory = httpClientFactory;
            this._conf = conf;
        }
        public async Task<KeyCloakSuccessfullLoginResponse> GetTokensAsync(string username, string password, KeycloakSettings keycloakSettings)
        {
            if (keycloakSettings is null) throw new Exception("KeycloakSettings failed");

            var client = _httpClientFactory.CreateClient("keycloak");

            var data = new[] {
                new KeyValuePair<string, string>("grant_type", "password"),
                new KeyValuePair<string, string>("client_id", keycloakSettings.resource),
                new KeyValuePair<string, string>("username", username),
                new KeyValuePair<string, string>("password", password),
            };

            var response = await client.PostAsync(keycloakSettings.BaseURL + keycloakSettings.LoginPath, new FormUrlEncodedContent(data));

            if (!response.IsSuccessStatusCode)
            {
                throw new Exception("Keycloak request failed");
            }
            var jsonContent = await response.Content.ReadAsStringAsync();

            var keyCloakResponse = JsonConvert.DeserializeObject<KeyCloakSuccessfullLoginResponse>(jsonContent);

            if (keyCloakResponse is null) throw new Exception("JWT Token ist null");

            return keyCloakResponse;
        }

        public async Task<KeyCloakSuccessfullLoginResponse> CreateUserAsync(KeycloakUser user, string accessToken, KeycloakSettings keycloakSettings)
        {
            var client = _httpClientFactory.CreateClient("keycloak");

            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
            var jsonUser = JsonConvert.SerializeObject(user);
            var content = new StringContent(jsonUser, Encoding.UTF8, "application/json");
            var response = await client.PostAsync(keycloakSettings.BaseURL + keycloakSettings.CreatePath, content);

            var resJsonString = await response.Content.ReadAsStringAsync();
            
            if (!response.IsSuccessStatusCode)
            {
                var keycloakError = JsonConvert.DeserializeObject<KeycloakError>(resJsonString);
                throw new Exception(keycloakError.errorMessage);
            }

            return await GetTokensAsync(user.username, user.credentials.FirstOrDefault(c => c.type.Equals("password")).value, keycloakSettings);
        }

        public async Task<string> AdminLoginAsync()
        {
            var keycloakSettings = _conf.GetRequiredSection($"{AppsettingsSection.Keycloak}").Get<KeycloakSettings>();
            if (keycloakSettings is null) throw new Exception("KeycloakSettings failed");

            var client = _httpClientFactory.CreateClient("adminKeycloak");

            var data = new[] {
                new KeyValuePair<string, string>("grant_type", "password"),
                new KeyValuePair<string, string>("client_id", keycloakSettings.resource),
                new KeyValuePair<string, string>("username", keycloakSettings.Realm_Master_Username),
                new KeyValuePair<string, string>("password", keycloakSettings.Realm_Master_Password),
            };

            var response = await client.PostAsync(keycloakSettings.BaseURL + keycloakSettings.LoginPath, new FormUrlEncodedContent(data));

            if (!response.IsSuccessStatusCode)
            {
                throw new Exception("Keycloak request failed");
            }
            var jsonString = await response.Content.ReadAsStringAsync();

            var keyCloakResponse = JsonConvert.DeserializeObject<KeyCloakSuccessfullLoginResponse>(jsonString);

            if (keyCloakResponse.access_token is null) throw new Exception("JWT Token ist null");

            return keyCloakResponse.access_token;
        }

        public async Task<KeyCloakSuccessfullLoginResponse> GetTokenWithRefreshTokenAsync(string refreshToken)
        {
            var keycloakSettings = _conf.GetRequiredSection($"{AppsettingsSection.Keycloak}").Get<KeycloakSettings>();
            if (keycloakSettings is null) throw new Exception("KeycloakSettings failed");

            var client = _httpClientFactory.CreateClient("keycloak");

            var data = new[] {
                new KeyValuePair<string, string>("grant_type", "refresh_token"),
                new KeyValuePair<string, string>("client_id", keycloakSettings.resource),
                new KeyValuePair<string, string>("refresh_token", refreshToken),
            };

            var response = await client.PostAsync(keycloakSettings.BaseURL + keycloakSettings.LoginPath, new FormUrlEncodedContent(data));

            if (!response.IsSuccessStatusCode)
            {
                throw new Exception("Keycloak request failed");
            }
            var jsonContent = await response.Content.ReadAsStringAsync();

            var keyCloakResponse = JsonConvert.DeserializeObject<KeyCloakSuccessfullLoginResponse>(jsonContent);
            
            if(keyCloakResponse is null) throw new Exception("Keycloak Response coulnt be deserialized");

            return keyCloakResponse;
        }
    }
}
