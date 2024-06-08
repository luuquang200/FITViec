using EmployerService.Domain.Entities;
using EmployerService.Infrastructure.Repositories;
using EmployerService.Shared.Dto;

namespace EmployerService.Domain.Services
{
	public interface ICompanyService
	{
		Task<CreateEmployerResult> CreateEmployerAsync(CreateEmployerRequest request);
	}
	public class CompanyService: ICompanyService
	{
		private readonly ICompanyRepository _companyRepository;
		public CompanyService(ICompanyRepository companyRepository)
		{
			_companyRepository = companyRepository;
		}

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
	}
}
