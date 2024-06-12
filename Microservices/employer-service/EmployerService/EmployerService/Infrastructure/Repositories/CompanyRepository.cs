using EmployerService.Domain.DTO;
using EmployerService.Domain.Entities;
using EmployerService.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace EmployerService.Infrastructure.Repositories
{
	public interface ICompanyRepository
	{
		Task AddAsync(Company company);
		Task<Company> GetByIdAsync(string companyId);
		Task<Company> GetByEmployerIdAsync(string employerId);
		Task UpdateAsync(Company company);
		Task DeleteAsync(string companyId);
		Task<List<Company>> GetAllCompaniesAsync();
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

		public async Task<Company> GetByIdAsync(string companyId)
		{
			var company = await _context.Companies
				.FirstOrDefaultAsync(c => c.CompanyId == companyId);

			if (company == null)
			{
				return null;
			}
			return company;
		}

		public async Task UpdateAsync(Company company)
		{
			_context.Companies.Update(company);
			await _context.SaveChangesAsync();
		}

		public async Task DeleteAsync(string companyId)
		{
			var company = await GetByIdAsync(companyId);
			if (company != null)
			{
				_context.Companies.Remove(company);
				await _context.SaveChangesAsync();
			}
		}

		public async Task<Company> GetByEmployerIdAsync(string employerId)
		{
			var company = await _context.Companies
				.FirstOrDefaultAsync(c => c.EmployerId == employerId);

			if (company == null)
			{
				return null;
			}

			return company;
		}
		public async Task<List<Company>> GetAllCompaniesAsync()
		{
			try
			{
				var companies = await _context.Companies.ToListAsync();
				return companies;
			}
			catch (Exception ex)
			{
				throw new Exception(ex.Message);
			}
		}
	}
}

