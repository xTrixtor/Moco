using MocoApi.DataStore;
using FastEndpoints;
using FastEndpoints.Swagger;
using Keycloak.AuthServices.Authentication;
using Keycloak.AuthServices.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using NSwag;
using MocoApi.Handler;
using Moco.Api.Factories.Db;
using Moco.Api.DataStore;
using Microsoft.EntityFrameworkCore;
using System.Formats.Asn1;
using System.Globalization;
using CsvHelper;
using MocoApi.Models.Moco.Resource;
using Moco.Api.Models.Moco.Dto;
using Newtonsoft.Json;

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
   .SwaggerDocument(o => o.ShortSchemaNames = true);

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
bld.Services.AddScoped<UtilsService>();
bld.Services.AddMemoryCache();
bld.Services.AddSingleton<MocoContextFactory>();

var app = bld.Build();

app.UseCors(builder => builder
.AllowAnyOrigin()
.AllowAnyMethod()
.AllowAnyHeader()
);

app.UseAuthentication() //add this
   .UseAuthorization() //add this
   .UseFastEndpoints(c =>
   {
       c.Endpoints.RoutePrefix = "api";
       c.Endpoints.ShortNames = true;
   })
   .UseSwaggerGen()
   .UseDefaultExceptionHandler();


using (var dbContext = new MoCoContext())
{
    if (!dbContext.DatabaseExists())
    {
        Console.WriteLine("Start Deleting");
        dbContext.Database.EnsureDeleted();

        dbContext.Database.EnsureCreated();
        Console.WriteLine("Start Created");

        var scripts = Directory.GetFiles(@"SqlScripts/");
        foreach (var script in scripts)
        {
            if (script.ToLower().Contains("inspection"))
            {
                var json = await File.ReadAllTextAsync(script);
                var records = JsonConvert.DeserializeObject<CostInspection[]>(json);
                await dbContext.CostInspections.AddRangeAsync(records);
                await dbContext.SaveChangesAsync();
                continue;
            }
            var sql = await File.ReadAllTextAsync(script);
            await dbContext.Database.ExecuteSqlRawAsync(sql);
        }
        Console.WriteLine("Seeded Data");
    }
}
app.Run();


enum AppsettingsSection
{
    Keycloak,
}

public sealed class KeycloakSettings
{
    public required string BaseURL { get; set; }
    public required string LoginPath { get; set; }
    public required string CreatePath { get; set; }
    public required string Realm_Master_Username { get; set; }
    public required string Realm_Master_Password { get; set; }
    public required string realm { get; set; }
    public required string resource { get; set; }
}

