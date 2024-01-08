using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Moco.Api.Migrations
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
                    Limit = table.Column<double>(type: "double", nullable: false),
                    UserId = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Budgets", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "CostInspections",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserYearMonthKey = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CostInspections", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "GroupCosts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UserId = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GroupCosts", x => x.Id);
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

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    KeycloakUserId = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Username = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Firstname = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    LastName = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Email = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
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
                    BudgetId = table.Column<int>(type: "int", nullable: false),
                    CostInspectionId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Charges", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Charges_Budgets_BudgetId",
                        column: x => x.BudgetId,
                        principalTable: "Budgets",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Charges_CostInspections_CostInspectionId",
                        column: x => x.CostInspectionId,
                        principalTable: "CostInspections",
                        principalColumn: "Id");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "FixedCosts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Value = table.Column<double>(type: "double", nullable: false),
                    GroupCostId = table.Column<int>(type: "int", nullable: false),
                    TimeInterval = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FixedCosts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FixedCosts_GroupCosts_GroupCostId",
                        column: x => x.GroupCostId,
                        principalTable: "GroupCosts",
                        principalColumn: "Id");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "CheckableFixedCosts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    FixedCostId = table.Column<int>(type: "int", nullable: false),
                    CostInspectionId = table.Column<int>(type: "int", nullable: false),
                    IsChecked = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CheckableFixedCosts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CheckableFixedCosts_CostInspections_CostInspectionId",
                        column: x => x.CostInspectionId,
                        principalTable: "CostInspections",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_CheckableFixedCosts_FixedCosts_FixedCostId",
                        column: x => x.FixedCostId,
                        principalTable: "FixedCosts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.InsertData(
                table: "Budgets",
                columns: new[] { "Id", "Limit", "Name", "UserId" },
                values: new object[,]
                {
                    { 1, 300.0, "Haushalt", "75097005-23ad-4e28-994b-91fdf414b205" },
                    { 2, 150.0, "Tanken", "75097005-23ad-4e28-994b-91fdf414b205" },
                    { 3, 100.0, "Aktivität", "75097005-23ad-4e28-994b-91fdf414b205" },
                    { 4, 100.0, "Luxus", "75097005-23ad-4e28-994b-91fdf414b205" }
                });

            migrationBuilder.InsertData(
                table: "GroupCosts",
                columns: new[] { "Id", "Name", "UserId" },
                values: new object[,]
                {
                    { 1, "Wohnen", "75097005-23ad-4e28-994b-91fdf414b205" },
                    { 2, "Investieren", "75097005-23ad-4e28-994b-91fdf414b205" },
                    { 3, "Auto", "75097005-23ad-4e28-994b-91fdf414b205" }
                });

            migrationBuilder.InsertData(
                table: "Revenue",
                columns: new[] { "Id", "CompanyName", "UserId", "Value" },
                values: new object[] { 1, "Compoany", "75097005-23ad-4e28-994b-91fdf414b205", 2500.2199999999998 });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedAt", "Email", "Firstname", "KeycloakUserId", "LastName", "Username" },
                values: new object[] { 1, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "email@gmx.de", "Nico", "75097005-23ad-4e28-994b-91fdf414b205", "Böhner", "boehnern" });

            migrationBuilder.InsertData(
                table: "FixedCosts",
                columns: new[] { "Id", "GroupCostId", "Name", "TimeInterval", "Value" },
                values: new object[,]
                {
                    { 1, 1, "Miete", 3, 670.0 },
                    { 2, 1, "Strom", 3, 45.0 },
                    { 3, 2, "Renten Basis", 3, 250.0 },
                    { 4, 2, "Flexible", 3, 250.0 },
                    { 5, 3, "Versicherung", 6, 250.0 },
                    { 6, 3, "Kredit", 3, 244.0 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Charges_BudgetId",
                table: "Charges",
                column: "BudgetId");

            migrationBuilder.CreateIndex(
                name: "IX_Charges_CostInspectionId",
                table: "Charges",
                column: "CostInspectionId");

            migrationBuilder.CreateIndex(
                name: "IX_CheckableFixedCosts_CostInspectionId",
                table: "CheckableFixedCosts",
                column: "CostInspectionId");

            migrationBuilder.CreateIndex(
                name: "IX_CheckableFixedCosts_FixedCostId",
                table: "CheckableFixedCosts",
                column: "FixedCostId");

            migrationBuilder.CreateIndex(
                name: "IX_CostInspections_UserYearMonthKey",
                table: "CostInspections",
                column: "UserYearMonthKey",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_FixedCosts_GroupCostId",
                table: "FixedCosts",
                column: "GroupCostId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Charges");

            migrationBuilder.DropTable(
                name: "CheckableFixedCosts");

            migrationBuilder.DropTable(
                name: "Revenue");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Budgets");

            migrationBuilder.DropTable(
                name: "CostInspections");

            migrationBuilder.DropTable(
                name: "FixedCosts");

            migrationBuilder.DropTable(
                name: "GroupCosts");
        }
    }
}
