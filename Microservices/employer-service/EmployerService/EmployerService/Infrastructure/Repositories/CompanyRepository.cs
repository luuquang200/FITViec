using EmployerService.Domain.DTO;
using EmployerService.Domain.Entities;
using EmployerService.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace EmployerService.Infrastructure.Repositories
{
	public interface ICompanyRepository
	{
		Task AddAsync(Company company);
		Task<Company> GetByIdAsync(Guid companyId);
		Task<Company> GetByEmployerIdAsync(string employerId);
		Task UpdateAsync(Company company);
		Task DeleteAsync(Guid companyId);
		Task<CompanyDto> GetAllCompaniesAsync();
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

		public async Task<Company> GetByEmployerIdAsync(string employerId)
		{
			return await _context.Companies
				.Include(c => c.Images)
				.FirstOrDefaultAsync(c => c.EmployerId == employerId);
		}
		public async Task<CompanyDto> GetAllCompaniesAsync()
		{
			var company = await _context.Companies
				.Include(c => c.Images)
				.FirstOrDefaultAsync();

			var companyDto = new CompanyDto
			{
				CompanyId = company.CompanyId.ToString(),
				EmployerId = company.EmployerId,
				CompanyName = company.CompanyName,
				CompanyType = company.CompanyType,
				CompanySize = company.CompanySize,
				Country = company.Country,
				WorkingDays = company.WorkingDays,
				OvertimePolicy = company.OvertimePolicy,
				CompanyOverview = company.CompanyOverview,
				KeySkills = company.KeySkills,
				WhyLoveWorkingHere = company.WhyLoveWorkingHere,
				LogoUrl = company.LogoUrl,
				Location = company.Location,
				WorkType = company.WorkType,
				Images = company.Images.Select(i => new ImageDto { ImageUrl = i.ImageUrl }).ToList()
			};

			return companyDto;
		}
	}
}
