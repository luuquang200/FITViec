using EmployerService.Domain.Entities;
using EmployerService.Infrastructure.Repositories;
using EmployerService.Shared.Dto;

namespace EmployerService.Domain.Services
{
	public interface ICompanyService
	{
		Task<CreateEmployerResult> CreateEmployerAsync(CreateEmployerRequest request);
		Task<UpdateEmployerResult> UpdateEmployerAsync(UpdateEmployerRequest request);
		Task<Company> GetCompanyByEmployerIdAsync(string employerId);
		Task DeleteCompanyAsync(Guid companyId);
	}
	public class CompanyService: ICompanyService
	{
		private readonly ICompanyRepository _companyRepository;
		public CompanyService(ICompanyRepository companyRepository)
		{
			_companyRepository = companyRepository;
		}

		// Create company by employer id
		public async Task<CreateEmployerResult> CreateEmployerAsync(CreateEmployerRequest request)
		{
			
			var company = new Company
			{
				CompanyId = Guid.NewGuid(),
				EmployerId = request.EmployerId,
				CompanyName = request.CompanyName,
				CompanyType = request.CompanyType,
				CompanySize = request.CompanySize,
				Country = request.Country,
				WorkingDays = request.WorkingDays,
				OvertimePolicy = request.OvertimePolicy,
				CompanyOverview = request.CompanyOverview,
				KeySkills = request.KeySkills,
				WhyLoveWorkingHere = request.WhyLoveWorkingHere,
				LogoUrl = request.LogoUrl,
				Location = request.Location,
				WorkType = request.WorkType,
				Images = request.Images.Select(url => new CompanyImage { ImageId = Guid.NewGuid(), ImageUrl = url }).ToList()
			};

			// Save to database
			await _companyRepository.AddAsync(company);

			return new CreateEmployerResult { IsSuccess = true, CompanyId = company.CompanyId };
		}

		// Update company by employer id
		public async Task<UpdateEmployerResult> UpdateEmployerAsync(UpdateEmployerRequest request)
		{
			var company = await _companyRepository.GetByEmployerIdAsync(request.EmployerId);
			if (company == null)
			{
				return new UpdateEmployerResult { IsSuccess = false, ErrorMessage = "Company not found" };
			}

			company.CompanyName = request.CompanyName;
			company.CompanyType = request.CompanyType;
			company.CompanySize = request.CompanySize;
			company.Country = request.Country;
			company.WorkingDays = request.WorkingDays;
			company.OvertimePolicy = request.OvertimePolicy;
			company.CompanyOverview = request.CompanyOverview;
			company.KeySkills = request.KeySkills;
			company.WhyLoveWorkingHere = request.WhyLoveWorkingHere;
			company.LogoUrl = request.LogoUrl;
			company.Location = request.Location;
			company.WorkType = request.WorkType;
			if (request.Images != null && request.Images.Any())
			{
				company.Images = request.Images.Select(url => new CompanyImage { ImageId = Guid.NewGuid(), ImageUrl = url }).ToList();
			}

			await _companyRepository.UpdateAsync(company);

			return new UpdateEmployerResult { IsSuccess = true };
		}

		// Get company by employer id
		public async Task<Company> GetCompanyByEmployerIdAsync(string employerId)
		{
			return await _companyRepository.GetByEmployerIdAsync(employerId);
		}

		// Delete company by employer id
		public async Task DeleteCompanyAsync(Guid companyId)
		{
			await _companyRepository.DeleteAsync(companyId);
		}




	}
}
