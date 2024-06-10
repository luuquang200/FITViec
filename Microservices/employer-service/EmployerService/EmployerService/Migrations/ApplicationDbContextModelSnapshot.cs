﻿// <auto-generated />
using EmployerService.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace EmployerService.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("EmployerService.Domain.Entities.Company", b =>
                {
                    b.Property<string>("CompanyId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("CompanyName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CompanyOverview")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CompanySize")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CompanyType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Country")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("EmployerId")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("KeySkills")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Location")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LogoUrl")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("OvertimePolicy")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("WhyLoveWorkingHere")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("WorkType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("WorkingDays")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("CompanyId");

                    b.ToTable("Companies");
                });

            modelBuilder.Entity("EmployerService.Domain.Entities.CompanyImage", b =>
                {
                    b.Property<string>("ImageId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("CompanyId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ImageUrl")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ImageId");

                    b.HasIndex("CompanyId");

                    b.ToTable("CompanyImages");
                });

            modelBuilder.Entity("EmployerService.Domain.Entities.CompanyImage", b =>
                {
                    b.HasOne("EmployerService.Domain.Entities.Company", "Company")
                        .WithMany("Images")
                        .HasForeignKey("CompanyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Company");
                });

            modelBuilder.Entity("EmployerService.Domain.Entities.Company", b =>
                {
                    b.Navigation("Images");
                });
#pragma warning restore 612, 618
        }
    }
}
