using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace MocoApi.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Budgets",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Value = table.Column<double>(type: "double", nullable: false),
                    UserId = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Budgets", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Charges",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ChargeName = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Value = table.Column<double>(type: "double", nullable: false),
                    UserId = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    TimeInterval = table.Column<int>(type: "int", nullable: false),
                    Catecory = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Charges", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Revenue",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CompanyName = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Value = table.Column<double>(type: "double", nullable: false),
                    UserId = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Revenue", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.InsertData(
                table: "Budgets",
                columns: new[] { "Id", "Name", "UserId", "Value" },
                values: new object[,]
                {
                    { 1, "Essen", "459f2d33-be1a-42fd-b912-fe8daebe07c6", 300.0 },
                    { 2, "Tanken", "459f2d33-be1a-42fd-b912-fe8daebe07c6", 150.0 },
                    { 3, "Aktivität", "459f2d33-be1a-42fd-b912-fe8daebe07c6", 100.0 }
                });

            migrationBuilder.InsertData(
                table: "Charges",
                columns: new[] { "Id", "Catecory", "ChargeName", "TimeInterval", "UserId", "Value" },
                values: new object[,]
                {
                    { 1, 12, "Dildo", 2, "459f2d33-be1a-42fd-b912-fe8daebe07c6", 123.31999999999999 },
                    { 2, 10, "Miete", 2, "459f2d33-be1a-42fd-b912-fe8daebe07c6", 23.5 },
                    { 3, 7, "Investieren", 2, "459f2d33-be1a-42fd-b912-fe8daebe07c6", 250.0 },
                    { 4, 0, "Runfunk", 3, "459f2d33-be1a-42fd-b912-fe8daebe07c6", 42.0 }
                });

            migrationBuilder.InsertData(
                table: "Revenue",
                columns: new[] { "Id", "CompanyName", "UserId", "Value" },
                values: new object[] { 1, "Compoany", "459f2d33-be1a-42fd-b912-fe8daebe07c6", 2500.2199999999998 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Budgets");

            migrationBuilder.DropTable(
                name: "Charges");

            migrationBuilder.DropTable(
                name: "Revenue");
        }
    }
}
