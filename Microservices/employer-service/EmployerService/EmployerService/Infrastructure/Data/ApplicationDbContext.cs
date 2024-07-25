using EmployerService.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace EmployerService.Infrastructure.Data
{

	//public class ApplicationDbContext : DbContext
	//{
	//	public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

	//	public DbSet<Company> Companies { get; set; }

	//	protected override void OnModelCreating(ModelBuilder modelBuilder)
	//	{
	//		base.OnModelCreating(modelBuilder);
	//	}

	//	//protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
	//	//{
	//	//	var con = Environment.GetEnvironmentVariable("ConnectionString");
	//	//	if (string.IsNullOrEmpty(con))
	//	//	{
	//	//		throw new Exception("Connection string is not set");	
	//	//	}

	//	//	optionsBuilder.UseSqlServer(con);
	//	//}
	//}
	public class Shard1MasterDbContext : DbContext
	{
		public Shard1MasterDbContext(DbContextOptions<Shard1MasterDbContext> options) : base(options) { }

		public DbSet<Company> Companies { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);
		}
	}

	public class Shard1ReadOnlyDbContext : DbContext
	{
		public Shard1ReadOnlyDbContext(DbContextOptions<Shard1ReadOnlyDbContext> options) : base(options) { }

		public DbSet<Company> Companies { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);
		}
	}

	public class Shard2MasterDbContext : DbContext
	{
		public Shard2MasterDbContext(DbContextOptions<Shard2MasterDbContext> options) : base(options) { }

		public DbSet<Company> Companies { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);
		}
	}

	public class Shard2ReadOnlyDbContext : DbContext
	{
		public Shard2ReadOnlyDbContext(DbContextOptions<Shard2ReadOnlyDbContext> options) : base(options) { }

		public DbSet<Company> Companies { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);
		}
	}

}
