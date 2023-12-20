using Microsoft.EntityFrameworkCore;

namespace Moco.Api.Factories.Db
{
    public class MocoContextFactory
    {
        public MocoContextFactory()
        {
            
        }

        public MoCoContext CreateMocoContext()
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
            .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
            .AddJsonFile("appsettings.json")
            .Build();
            if (configuration is null) throw new Exception("Couldnt load config");

            var connectionString = configuration.GetConnectionString("MySql");
            var serverVersion = new MySqlServerVersion(new Version(8, 1, 0));

            var contextOptionBuilder = new DbContextOptionsBuilder<MoCoContext>()
                .UseLazyLoadingProxies()
                .UseMySql(configuration.GetConnectionString("MySql"), serverVersion);

            return new MoCoContext(contextOptionBuilder.Options);
        }
    }
}
