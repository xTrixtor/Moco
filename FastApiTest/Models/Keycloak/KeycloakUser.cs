namespace MocoApi.Models.Keycloak
{
    public record KeycloakUser
    {
        public required string username { get; set; }
        public bool enabled { get; set; } = true;
        public Credential[] credentials { get; set; }
        public required string firstName { get; set; }
        public required string lastName { get; set; }
        public required string email { get; set; }
    }

    public record Credential
    {
        public string type { get; set; }
        public string value { get; set; }
        public bool temporary { get; set; } = false;
    }

    public record KeycloakError
    {
        public string errorMessage { get; set; }
    }
}
