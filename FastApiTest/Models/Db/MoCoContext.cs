using MocoApi.Models.Moco.Resource;
using Microsoft.EntityFrameworkCore;

public class MoCoContext : DbContext
{
    public DbSet<Revenue> Revenue { get; set; }
    public DbSet<Charge> Charges { get; set; }
    public DbSet<Budget> Budgets { get; set; }

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
                new Charge { ChargeName = "Dildo", Catecory = Catecory.Luxus, TimeInterval = TimeInterval.monatlich, UserId = "459f2d33-be1a-42fd-b912-fe8daebe07c6", Id = 1, Value = 123.32 },
                new Charge { ChargeName = "Miete", Catecory = Catecory.Wohnen, TimeInterval = TimeInterval.monatlich, UserId = "459f2d33-be1a-42fd-b912-fe8daebe07c6", Id = 2, Value = 23.5 },
                new Charge { ChargeName = "Investieren", Catecory = Catecory.Investieren, TimeInterval = TimeInterval.monatlich, UserId = "459f2d33-be1a-42fd-b912-fe8daebe07c6", Id = 3, Value = 250.0 },
                new Charge { ChargeName = "Runfunk", Catecory = Catecory.Sonstiges, TimeInterval = TimeInterval.vierteljährlich, UserId = "459f2d33-be1a-42fd-b912-fe8daebe07c6", Id = 4, Value = 42 },
            });

        modelBuilder.Entity<Revenue>()
            .HasData(new Revenue { CompanyName="Compoany", Id=1, UserId= "459f2d33-be1a-42fd-b912-fe8daebe07c6", Value=2500.22});

        modelBuilder.Entity<Budget>()
            .HasData(
                new Budget { Name = "Essen", Id = 1, UserId = "459f2d33-be1a-42fd-b912-fe8daebe07c6", Value = 300 },
                new Budget { Name = "Tanken", Id = 2, UserId = "459f2d33-be1a-42fd-b912-fe8daebe07c6", Value = 150 },
                new Budget { Name = "Aktivität", Id = 3, UserId = "459f2d33-be1a-42fd-b912-fe8daebe07c6", Value = 100 }
            );
    }
}

