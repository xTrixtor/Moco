using FastApiTest.DataStore;
using FastEndpoints;
using FastEndpoints.Swagger;
using Keycloak.AuthServices.Authentication;
using Keycloak.AuthServices.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using NSwag;


IConfigurationRoot config = new ConfigurationBuilder()
    .AddJsonFile("appsettings.json")
    .AddEnvironmentVariables()
    .Build();

var bld = WebApplication.CreateBuilder();

bld.Services
   .AddFastEndpoints()
   .AddAuthorization()
   .SwaggerDocument();

bld.Services.AddKeycloakAuthentication(bld.Configuration);

bld.Services.AddAuthorization(options =>
{
    options.AddPolicy("Admin", builder =>
    {
        builder
        .RequireResourceRoles("fastapi_admin");
    });
    options.AddPolicy("User", builder =>
    {
        builder
        .RequireResourceRoles("fastapi_user");
    });
})
    .AddKeycloakAuthorization(bld.Configuration);


bld.Services.SwaggerDocument(o =>
{
    o.EnableJWTBearerAuth = false;
    o.DocumentSettings = s =>
    {
        s.DocumentName = "Initial-Release";
        s.Title = "Web API";
        s.Version = "v1.0";
        s.AddAuth("Bearer", new()
        {
            Type = OpenApiSecuritySchemeType.Http,
            Scheme = JwtBearerDefaults.AuthenticationScheme,
            BearerFormat = "JWT",
        });
    };
});

//DIJ

bld.Services.AddScoped<KeycloakServices>();

var app = bld.Build();

app.UseAuthentication() //add this
   .UseAuthorization() //add this
   .UseFastEndpoints()
   .UseSwaggerGen()
   .UseDefaultExceptionHandler();
app.Run();



enum AppsettingsSection
{
    Keycloak,
}

public sealed class KeycloakSettings {
    public required string BaseURL { get; set; }
    public required string LoginPath { get; set; }
    public required string CreatePath { get; set; }
    public required string Realm_Master_Username { get; set; }
    public required string Realm_Master_Password { get; set; }
    public required string realm { get; set; }
    public required string resource { get; set; }
}

