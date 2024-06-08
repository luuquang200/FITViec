using EmployerService.Domain.Entities;
using EmployerService.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace EmployerService.Infrastructure.Repositories
{
	public interface ICompanyRepository
	{
		Task AddAsync(Company company);
		Task<Company> GetByIdAsync(Guid companyId);
		Task UpdateAsync(Company company);
		Task DeleteAsync(Guid companyId);
	}
	public class CompanyRepository : ICompanyRepository
	{
		private readonly ApplicationDbContext _context;

		public CompanyRepository(ApplicationDbContext context)
		{
			_context = context;
		}

		public async Task AddAsync(Company company)
		{
			await _context.Companies.AddAsync(company);
			await _context.SaveChangesAsync();
		}

		public async Task<Company> GetByIdAsync(Guid companyId)
		{
			return await _context.Companies
				.Include(c => c.Images)
				.FirstOrDefaultAsync(c => c.CompanyId == companyId);
		}

		public async Task UpdateAsync(Company company)
		{
			_context.Companies.Update(company);
			await _context.SaveChangesAsync();
		}

		public async Task DeleteAsync(Guid companyId)
		{
			var company = await GetByIdAsync(companyId);
			if (company != null)
			{
				_context.Companies.Remove(company);
				await _context.SaveChangesAsync();
			}
		}
	}
}
