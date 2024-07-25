using EmployerService.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace EmployerService.Infrastructure.Data
{

	public class ApplicationDbContext : DbContext
	{
		public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

		public DbSet<Company> Companies { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);
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
