namespace MocoApi.Models.Keycloak
{
    public record KeycloakUser
    {
        public string username { get; set; }
        public bool enabled { get; set; } = true;
        public Credential[] credentials { get; set; }
    }

    public record Credential
    {
        public string type { get; set; }
        public string value { get; set; }
        public bool temporary { get; set; } = false;
    }
}
