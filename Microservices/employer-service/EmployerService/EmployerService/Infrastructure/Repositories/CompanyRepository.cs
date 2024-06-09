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
		Task<List<CompanyDto>> GetAllCompaniesAsync();
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
			return await _context.Companies
				.Include(c => c.Images)
				.FirstOrDefaultAsync(c => c.CompanyId == companyId);
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
			return await _context.Companies
				.Include(c => c.Images)
				.FirstOrDefaultAsync(c => c.EmployerId == employerId);
		}
		public async Task<List<CompanyDto>> GetAllCompaniesAsync()
		{
			return await _context.Companies
				.Include(c => c.Images)
				.Select(c => new CompanyDto
				{
					CompanyId = c.CompanyId,
					EmployerId = c.EmployerId,
					CompanyName = c.CompanyName,
					CompanyType = c.CompanyType,
					CompanySize = c.CompanySize,
					Country = c.Country,
					WorkingDays = c.WorkingDays,
					OvertimePolicy = c.OvertimePolicy,
					CompanyOverview = c.CompanyOverview,
					KeySkills = c.KeySkills,
					WhyLoveWorkingHere = c.WhyLoveWorkingHere,
					LogoUrl = c.LogoUrl,
					Location = c.Location,
					WorkType = c.WorkType,
					Images = c.Images.Select(i => new ImageDto { ImageUrl = i.ImageUrl }).ToList()
				})
				.ToListAsync(); 
		}
	}
}

