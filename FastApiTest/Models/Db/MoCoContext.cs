using MocoApi.Models.Moco.Resource;
using Microsoft.EntityFrameworkCore;
using Moco.Api.Models.Moco.Dto;

public class MoCoContext : DbContext
{
    public DbSet<Revenue> Revenue { get; set; }
    public DbSet<Charge> Charges { get; set; }
    public DbSet<Budget> Budgets { get; set; }
    public DbSet<Person> Persons { get; set; }
    public DbSet<FixedCost> FixedCosts { get; set; }
    public DbSet<GroupCost> GroupCosts { get; set; }

    public MoCoContext()
    {
        
    }

    public MoCoContext(DbContextOptions options): base(options)
    {
        
    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        IConfigurationRoot configuration = new ConfigurationBuilder()
            .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
            .AddJsonFile("appsettings.json")
            .Build();
        if (configuration is null) throw new Exception("Couldnt load config");

        var serverVersion = new MySqlServerVersion(new Version(8, 1, 0));
        options
            .UseLazyLoadingProxies()
            .UseMySql(configuration.GetConnectionString("MySql"), serverVersion);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        var budgets = new List<Budget>() {
                new Budget { Name = "Haushalt", Id = 1, UserId = "75097005-23ad-4e28-994b-91fdf414b205", Limit = 300 },
                new Budget { Name = "Tanken", Id = 2, UserId = "75097005-23ad-4e28-994b-91fdf414b205", Limit = 150 },
                new Budget { Name = "Aktivität", Id = 3, UserId = "75097005-23ad-4e28-994b-91fdf414b205", Limit = 100 },
                new Budget { Name = "Luxus", Id = 4, UserId = "75097005-23ad-4e28-994b-91fdf414b205", Limit = 100 },
        };
        var charges = new List<Charge>() {
                new Charge { ChargeName = "Rewe", TimeInterval = TimeInterval.monatlich, UserId = "75097005-23ad-4e28-994b-91fdf414b205", Id = 2, Value = 23.5, BudgetId = budgets[0].Id},
                new Charge { ChargeName = "Investieren", TimeInterval = TimeInterval.monatlich, UserId = "75097005-23ad-4e28-994b-91fdf414b205", Id = 3, Value = 250.0, BudgetId = budgets[0].Id },
                new Charge { ChargeName = "Runfunk", TimeInterval = TimeInterval.vierteljährlich, UserId = "75097005-23ad-4e28-994b-91fdf414b205", Id = 4, Value = 42, BudgetId = budgets[0].Id } 
        };
        var costGroups = new List<GroupCost>()
        {
            new GroupCost { Id = 1, Name = "Wohnen", UserId = "75097005-23ad-4e28-994b-91fdf414b205"},
            new GroupCost { Id = 2, Name = "Investieren", UserId = "75097005-23ad-4e28-994b-91fdf414b205"}
        };
        var fixCosts = new List<FixedCost>()
        {
            new FixedCost{ Id = 1, Name = "Miete", Value = 670, GroupCostId = 1, TimeInterval = TimeInterval.monatlich},
            new FixedCost{ Id = 2, Name = "Strom", Value = 45, GroupCostId = 1, TimeInterval = TimeInterval.monatlich},
            new FixedCost{ Id = 3, Name = "Lebenversicherung", Value = 250, GroupCostId = 2, TimeInterval = TimeInterval.monatlich},
        };


        modelBuilder.Entity<Charge>()
            .HasKey(c => c.Id);

        modelBuilder.Entity<Revenue>()
                .HasKey(c => c.Id);

        modelBuilder.Entity<FixedCost>()
            .HasKey(c => c.Id);

        modelBuilder.Entity<GroupCost>()
            .HasKey(c => c.Id);

        modelBuilder.Entity<GroupCost>()
            .HasMany(x => x.FixedCosts)
            .WithOne(x => x.GroupCost)
            .HasForeignKey(x => x.GroupCostId)
            .IsRequired(false);

        modelBuilder.Entity<Budget>()
            .HasMany(x => x.Charges)
            .WithOne(x => x.Budget)
            .HasForeignKey(x => x.BudgetId)
            .IsRequired(false);


        modelBuilder.Entity<Budget>()
            .HasData(budgets);

        modelBuilder.Entity<Charge>()
            .HasData(charges);

        modelBuilder.Entity<GroupCost>()
            .HasData(costGroups);

        modelBuilder.Entity<FixedCost>()
            .HasData(fixCosts);

        modelBuilder.Entity<Revenue>()
            .HasData(new Revenue { CompanyName = "Compoany", Id = 1, UserId = "75097005-23ad-4e28-994b-91fdf414b205", Value = 2500.22 });

        modelBuilder.Entity<Person>()
            .HasData(
                new Person { CreatedAt = new DateTime(), Email = "email@gmx.de", KeycloakUserId = "75097005-23ad-4e28-994b-91fdf414b205", Id = 1, Firstname = "Nico", LastName = "Böhner", Username = "boehnern" }
            );
    }
}

