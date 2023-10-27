﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace MocoApi.Migrations
{
    [DbContext(typeof(MoCoContext))]
    partial class MoCoContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.12")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("MocoApi.Models.Moco.Resource.Budget", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<double>("Value")
                        .HasColumnType("double");

                    b.HasKey("Id");

                    b.ToTable("Budgets");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "Essen",
                            UserId = "459f2d33-be1a-42fd-b912-fe8daebe07c6",
                            Value = 300.0
                        },
                        new
                        {
                            Id = 2,
                            Name = "Tanken",
                            UserId = "459f2d33-be1a-42fd-b912-fe8daebe07c6",
                            Value = 150.0
                        },
                        new
                        {
                            Id = 3,
                            Name = "Aktivität",
                            UserId = "459f2d33-be1a-42fd-b912-fe8daebe07c6",
                            Value = 100.0
                        });
                });

            modelBuilder.Entity("MocoApi.Models.Moco.Resource.Charge", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("Catecory")
                        .HasColumnType("int");

                    b.Property<string>("ChargeName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("TimeInterval")
                        .HasColumnType("int");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<double>("Value")
                        .HasColumnType("double");

                    b.HasKey("Id");

                    b.ToTable("Charges");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Catecory = 12,
                            ChargeName = "Dildo",
                            TimeInterval = 2,
                            UserId = "459f2d33-be1a-42fd-b912-fe8daebe07c6",
                            Value = 123.31999999999999
                        },
                        new
                        {
                            Id = 2,
                            Catecory = 10,
                            ChargeName = "Miete",
                            TimeInterval = 2,
                            UserId = "459f2d33-be1a-42fd-b912-fe8daebe07c6",
                            Value = 23.5
                        },
                        new
                        {
                            Id = 3,
                            Catecory = 7,
                            ChargeName = "Investieren",
                            TimeInterval = 2,
                            UserId = "459f2d33-be1a-42fd-b912-fe8daebe07c6",
                            Value = 250.0
                        },
                        new
                        {
                            Id = 4,
                            Catecory = 0,
                            ChargeName = "Runfunk",
                            TimeInterval = 3,
                            UserId = "459f2d33-be1a-42fd-b912-fe8daebe07c6",
                            Value = 42.0
                        });
                });

            modelBuilder.Entity("MocoApi.Models.Moco.Resource.Revenue", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("CompanyName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<double>("Value")
                        .HasColumnType("double");

                    b.HasKey("Id");

                    b.ToTable("Revenue");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            CompanyName = "Compoany",
                            UserId = "459f2d33-be1a-42fd-b912-fe8daebe07c6",
                            Value = 2500.2199999999998
                        });
                });
#pragma warning restore 612, 618
        }
    }
}
