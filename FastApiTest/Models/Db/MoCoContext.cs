using MocoApi.Models.Moco.Resource;
using Microsoft.EntityFrameworkCore;

public class MoCoContext : DbContext
{
    public DbSet<Revenue> Revenue { get; set; }
    public DbSet<Charge> Charges { get; set; }
    public DbSet<Budget> Budgets { get; set; }
    public DbSet<Person> Persons { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        IConfigurationRoot configuration = new ConfigurationBuilder()
            .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
            .AddJsonFile("appsettings.json")
            .Build();
        if (configuration is null) throw new Exception("Couldnt load config");

        var serverVersion = new MySqlServerVersion(new Version(8, 1, 0));
        options.UseMySql(configuration.GetConnectionString("MySql"), serverVersion);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Charge>()
            .HasKey(c => c.Id);

        modelBuilder.Entity<Revenue>()
                .HasKey(c => c.Id);

        modelBuilder.Entity<Charge>()
            .HasData(new Charge[] 
            { 
                new Charge { ChargeName = "Dildo", Catecory = Catecory.Luxus, TimeInterval = TimeInterval.monatlich, UserId = "75097005-23ad-4e28-994b-91fdf414b205", Id = 1, Value = 123.32 },
                new Charge { ChargeName = "Miete", Catecory = Catecory.Wohnen, TimeInterval = TimeInterval.monatlich, UserId = "75097005-23ad-4e28-994b-91fdf414b205", Id = 2, Value = 23.5 },
                new Charge { ChargeName = "Investieren", Catecory = Catecory.Investieren, TimeInterval = TimeInterval.monatlich, UserId = "75097005-23ad-4e28-994b-91fdf414b205", Id = 3, Value = 250.0 },
                new Charge { ChargeName = "Runfunk", Catecory = Catecory.Sonstiges, TimeInterval = TimeInterval.vierteljährlich, UserId = "75097005-23ad-4e28-994b-91fdf414b205", Id = 4, Value = 42 },
            });

        modelBuilder.Entity<Revenue>()
            .HasData(new Revenue { CompanyName="Compoany", Id=1, UserId= "75097005-23ad-4e28-994b-91fdf414b205", Value=2500.22});

        modelBuilder.Entity<Budget>()
            .HasData(
                new Budget { Name = "Essen", Id = 1, UserId = "75097005-23ad-4e28-994b-91fdf414b205", Value = 300 },
                new Budget { Name = "Tanken", Id = 2, UserId = "75097005-23ad-4e28-994b-91fdf414b205", Value = 150 },
                new Budget { Name = "Aktivität", Id = 3, UserId = "75097005-23ad-4e28-994b-91fdf414b205", Value = 100 }
            );
        modelBuilder.Entity<Person>()
            .HasData(
                new Person { CreatedAt = new DateTime(), Email = "email@gmx.de", KeycloakUserId = "75097005-23ad-4e28-994b-91fdf414b205", Id=1, Firstname= "Nico", LastName="Böhner", Username="boehnern"}
            );
    }
}

