using Newtonsoft.Json;
using System.Net.Http.Headers;
using System.Text;
using MocoApi.Models.Keycloak;
using MocoApi.Endpoints.User;

namespace MocoApi.DataStore
{
    public class KeycloakServices
    {
        public async Task<string> GetAccessTokenAsync(string username, string password, KeycloakSettings keycloakSettings)
        {
            if (keycloakSettings is null) throw new Exception("KeycloakSettings failed");

            using HttpClient client = new();

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

            if (keyCloakResponse.access_token is null) throw new Exception("JWT Token ist null");

            return keyCloakResponse.access_token;
        }

        public async Task<bool> CreateUserAsync(KeycloakUser user, string accessToken, KeycloakSettings keycloakSettings)
        {
            using HttpClient client = new();

            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
            var content = new StringContent(JsonConvert.SerializeObject(user), Encoding.UTF8, "application/json");
            var response = await client.PostAsync(keycloakSettings.BaseURL + keycloakSettings.CreatePath, content);
            if (response.IsSuccessStatusCode)
                return true;

            return false;
        }
    }
}
