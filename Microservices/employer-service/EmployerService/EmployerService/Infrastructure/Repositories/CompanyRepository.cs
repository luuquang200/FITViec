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
			var company = await _context.Companies
				.FirstOrDefaultAsync(c => c.EmployerId == employerId);

			if (company == null)
			{
				return null;
			}

			return company;
		}
		public async Task<List<CompanyDto>> GetAllCompaniesAsync()
		{
			try
			{
				var companies = await _context.Companies.ToListAsync();
				var companyDtos = new List<CompanyDto>();
				foreach (var company in companies)
				{
					var companyDto = new CompanyDto
					{
						CompanyId = company.CompanyId,
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
						Image = company.Image
					};
					companyDtos.Add(companyDto);
				}
				return companyDtos;
			}
			catch (Exception ex)
			{
				throw new Exception(ex.Message);
			}
		}
	}
}

