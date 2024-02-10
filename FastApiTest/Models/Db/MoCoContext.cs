using MocoApi.Models.Moco.Resource;
using Microsoft.EntityFrameworkCore;
using Moco.Api.Models.Moco.Resource;

public class MoCoContext : DbContext
{
    public DbSet<Revenue> Revenue { get; set; }
    public DbSet<Charge> Charges { get; set; }
    public DbSet<Budget> Budgets { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<FixedCost> FixedCosts { get; set; }
    public DbSet<GroupCost> GroupCosts { get; set; }
    public DbSet<CostInspection> CostInspections { get; set; }
    public DbSet<SavingGoal> SavingGoals { get; set; }

    public MoCoContext()
    {

    }

    public MoCoContext(DbContextOptions options) : base(options)
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
                new Budget { Name = "Haushalt", Id = 1, UserId = "67f4dc76-02f5-4cf1-bbe8-85edbc2af1ed", Limit = 300 },
                new Budget { Name = "Tanken", Id = 2, UserId = "67f4dc76-02f5-4cf1-bbe8-85edbc2af1ed", Limit = 150 },
                new Budget { Name = "Aktivität", Id = 3, UserId = "67f4dc76-02f5-4cf1-bbe8-85edbc2af1ed", Limit = 100 },
                new Budget { Name = "Luxus", Id = 4, UserId = "67f4dc76-02f5-4cf1-bbe8-85edbc2af1ed", Limit = 100 },
        };

        var costGroups = new List<GroupCost>()
        {
            new GroupCost { Id = 1, Name = "Wohnen", UserId = "67f4dc76-02f5-4cf1-bbe8-85edbc2af1ed"},
            new GroupCost { Id = 2, Name = "Investieren", UserId = "67f4dc76-02f5-4cf1-bbe8-85edbc2af1ed"},
            new GroupCost { Id = 3, Name = "Auto", UserId = "67f4dc76-02f5-4cf1-bbe8-85edbc2af1ed"},
        };
        var fixCosts = new List<FixedCost>()
        {
            new FixedCost{ Id = 1, Name = "Miete", Value = 670, GroupCostId = 1, TimeInterval = TimeInterval.monatlich},
            new FixedCost{ Id = 2, Name = "Strom", Value = 45, GroupCostId = 1, TimeInterval = TimeInterval.monatlich},
            new FixedCost{ Id = 3, Name = "Renten Basis", Value = 250, GroupCostId = 2, TimeInterval = TimeInterval.monatlich},
            new FixedCost{ Id = 4, Name = "Flexible", Value = 250, GroupCostId = 2, TimeInterval = TimeInterval.monatlich},
            new FixedCost{ Id = 5, Name = "Versicherung", Value = 250, GroupCostId = 3, TimeInterval = TimeInterval.jährlich},
            new FixedCost{ Id = 6, Name = "Kredit", Value = 244, GroupCostId = 3, TimeInterval = TimeInterval.monatlich},
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

        modelBuilder.Entity<CostInspection>()
            .HasMany(x => x.BudgetCharges)
            .WithOne(x => x.CostInspection)
            .HasForeignKey(x => x.CostInspectionId)
            .IsRequired(false);

        modelBuilder.Entity<CostInspection>()
            .HasIndex(c => c.UserYearMonthKey)
            .IsUnique(true);


        modelBuilder.Entity<Budget>()
            .HasData(budgets);

        modelBuilder.Entity<GroupCost>()
            .HasData(costGroups);

        modelBuilder.Entity<FixedCost>()
            .HasData(fixCosts);

        modelBuilder.Entity<Revenue>()
            .HasData(new Revenue { CompanyName = "Compoany", Id = 1, UserId = "67f4dc76-02f5-4cf1-bbe8-85edbc2af1ed", Value = 2500.22 });

        modelBuilder.Entity<User>()
            .HasData(
                new User { CreatedAt = new DateTime(), Email = "email@gmx.de", KeycloakUserId = "67f4dc76-02f5-4cf1-bbe8-85edbc2af1ed", Id = 1, Firstname = "Nico", LastName = "Böhner", Username = "boehnern" }
            );
    }
}

