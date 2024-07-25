using EmployerService.Domain.Entities;
using EmployerService.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace EmployerService.Infrastructure.Repositories
{
	public interface ICompanyRepository
	{
		Task AddAsync(Company company);
		Task<Company?> GetByIdAsync(string companyId);
		Task<Company?> GetByEmployerIdAsync(string employerId);
		Task UpdateAsync(Company company);
		Task DeleteAsync(string companyId);
		Task<List<Company>> GetAllCompaniesAsync();
		Task<List<Company>> GetTopCompaniesAsync();
		Task DeleteAllCompaniesAsync();
	}
	public class CompanyRepository : ICompanyRepository
	{
		private readonly Shard1MasterDbContext _shard1MasterContext;
		private readonly Shard1ReadOnlyDbContext _shard1ReadOnlyContext;
		private readonly Shard2MasterDbContext _shard2MasterContext;
		private readonly Shard2ReadOnlyDbContext _shard2ReadOnlyContext;

		public CompanyRepository(
			Shard1MasterDbContext shard1MasterContext,
			Shard1ReadOnlyDbContext shard1ReadOnlyContext,
			Shard2MasterDbContext shard2MasterContext,
			Shard2ReadOnlyDbContext shard2ReadOnlyContext)
		{
			_shard1MasterContext = shard1MasterContext;
			_shard1ReadOnlyContext = shard1ReadOnlyContext;
			_shard2MasterContext = shard2MasterContext;
			_shard2ReadOnlyContext = shard2ReadOnlyContext;
		}

		private int GetShardId(string guid)
		{
			var hash = guid.GetHashCode();
			return Math.Abs(hash) % 2 + 1;
		}

		private DbContext GetMasterContext(string companyId)
		{
			var shardId = GetShardId(companyId);
			Console.WriteLine("--> Master Shard ID: " + shardId + " Company ID: " + companyId);
			return shardId == 1 ? _shard1MasterContext : _shard2MasterContext;
		}

		private DbContext GetReadOnlyContext(string companyId)
		{
			var shardId = GetShardId(companyId);
			Console.WriteLine("--> Read Shard ID: " + shardId + " Company ID: " + companyId);

			DbContext readOnlyContext = shardId == 1 ? _shard1ReadOnlyContext : _shard2ReadOnlyContext;
			DbContext masterContext = shardId == 1 ? _shard1MasterContext : _shard2MasterContext;

			if (IsDatabaseAvailable(readOnlyContext))
			{
				return readOnlyContext;
			}
			else
			{
				Console.WriteLine("--> Read replica not available, switching to master.");
				return masterContext;
			}
		}

		private bool IsDatabaseAvailable(DbContext context)
		{
			try
			{
				context.Database.OpenConnection();
				context.Database.CloseConnection();
				return true;
			}
			catch
			{
				return false;
			}
		}

		public async Task AddAsync(Company company)
		{
			var context = GetMasterContext(company.CompanyId);
			await context.Set<Company>().AddAsync(company);
			await context.SaveChangesAsync();
		}

		public async Task<Company?> GetByIdAsync(string companyId)
		{
			var context = GetReadOnlyContext(companyId);

			var company = await context.Set<Company>().FirstOrDefaultAsync(c => c.CompanyId == companyId);
			return company;
		}

		public async Task<Company?> GetByEmployerIdAsync(string employerId)
		{
			var context1 = _shard1ReadOnlyContext.Set<Company>().FirstOrDefaultAsync(c => c.EmployerId == employerId);
			var context2 = _shard2ReadOnlyContext.Set<Company>().FirstOrDefaultAsync(c => c.EmployerId == employerId);
			await Task.WhenAll(context1, context2);

			return context1.Result ?? context2.Result;
		}

		public async Task UpdateAsync(Company company)
		{
			var context = GetMasterContext(company.CompanyId);
			context.Set<Company>().Update(company);
			await context.SaveChangesAsync();
		}

		public async Task DeleteAsync(string companyId)
		{
			var company = await GetByIdAsync(companyId);
			if (company != null)
			{
				var context = GetMasterContext(companyId);
				context.Set<Company>().Remove(company);
				await context.SaveChangesAsync();
			}
		}

		public async Task<List<Company>> GetAllCompaniesAsync()
		{
			var context1 = _shard1ReadOnlyContext.Companies.ToListAsync();
			var context2 = _shard2ReadOnlyContext.Companies.ToListAsync();
			await Task.WhenAll(context1, context2);

			var companies = new List<Company>();
			companies.AddRange(context1.Result);
			companies.AddRange(context2.Result);

			return companies;
		}

		public async Task<List<Company>> GetTopCompaniesAsync()
		{
			var context1 = _shard1ReadOnlyContext.Set<Company>().ToListAsync();
			var context2 = _shard2ReadOnlyContext.Set<Company>().ToListAsync();
			await Task.WhenAll(context1, context2);

			var companies = new List<Company>();
			companies.AddRange(context1.Result);
			companies.AddRange(context2.Result);

			return companies;
		}

		// delete all companies
		public async Task DeleteAllCompaniesAsync()
		{
			var context1 = _shard1MasterContext.Database.ExecuteSqlRawAsync("DELETE FROM Companies");
			var context2 = _shard2MasterContext.Database.ExecuteSqlRawAsync("DELETE FROM Companies");
			await Task.WhenAll(context1, context2);
		}
	}
}
