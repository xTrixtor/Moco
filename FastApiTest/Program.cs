using MocoApi.DataStore;
using FastEndpoints;
using FastEndpoints.Swagger;
using Keycloak.AuthServices.Authentication;
using Keycloak.AuthServices.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using NSwag;
using MocoApi.Handler;
using Moco.Api.Factories.Db;

IConfigurationRoot config = new ConfigurationBuilder()
    .AddJsonFile("appsettings.json")
    .AddEnvironmentVariables()
    .Build();

var bld = WebApplication.CreateBuilder();
string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

bld.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      builder =>
                      {
                          builder.AllowAnyOrigin();
                          builder.AllowAnyMethod();
                          builder.AllowAnyMethod();
                      });
});

bld.Services
   .AddFastEndpoints()
   .AddAuthorization()
   .SwaggerDocument(o => o.ShortSchemaNames = true) ;

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
    o.ShortSchemaNames = true;
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
bld.Services.AddScoped<CachedAdminTokenHandler>();
bld.Services.AddHttpClient("adminKeycloak").AddHttpMessageHandler<CachedAdminTokenHandler>();
bld.Services.AddSingleton<IConfiguration>(bld.Configuration);
bld.Services.AddScoped<KeycloakServices>();
bld.Services.AddMemoryCache();
bld.Services.AddSingleton<MocoContextFactory>();

var app = bld.Build();

app.UseCors(builder => builder
.AllowAnyOrigin()
.AllowAnyMethod()
.AllowAnyHeader()
) ;

app.UseAuthentication() //add this
   .UseAuthorization() //add this
   .UseFastEndpoints(c =>
   {
       c.Endpoints.RoutePrefix = "api";
       c.Endpoints.ShortNames = true;
   })
   .UseSwaggerGen()
   .UseDefaultExceptionHandler();

#if DEBUGCLEAN
{
using(var dbContext = new MoCoContext())
{
    dbContext.Database.EnsureDeleted();
    dbContext.Database.EnsureCreated();
}
}
#endif
{
    app.Run();
}


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

