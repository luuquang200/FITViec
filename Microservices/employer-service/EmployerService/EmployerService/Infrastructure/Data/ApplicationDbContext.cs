using EmployerService.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace EmployerService.Infrastructure.Data
{

	public class ApplicationDbContext : DbContext
	{
		public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

		//public DbSet<Employer> Employers { get; set; }
		public DbSet<Company> Companies { get; set; }
		public DbSet<CompanyImage> CompanyImages { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			//modelBuilder.Entity<Employer>()
			//	.HasOne(e => e.Company)
			//	.WithOne(c => c.Employer)
			//	.HasForeignKey<Company>(c => c.EmployerId);

			modelBuilder.Entity<Company>()
				.HasMany(c => c.Images)
				.WithOne(i => i.Company)
				.HasForeignKey(i => i.CompanyId);

			modelBuilder.Entity<CompanyImage>()
				.HasKey(i => i.ImageId); 
		}

		//protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		//{
		//	var con = Environment.GetEnvironmentVariable("ConnectionString");
		//	if (string.IsNullOrEmpty(con))
		//	{
		//		throw new Exception("Connection string is not set");	
		//	}

		//	optionsBuilder.UseSqlServer(con);
		//}
	}
}
