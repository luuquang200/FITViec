using EmployerService.Domain.DTO;
using EmployerService.Infrastructure.Repositories;
using System.Reflection.Metadata;

namespace EmployerService.Domain.Services
{
	public interface IJobService
	{
		Task<CreateJobResponseDto> PostJobAsync(PostJobRequestDto request);
	}

	public class JobService : IJobService
	{
		private readonly ICompanyRepository _companyRepository;
		private readonly HttpClient _httpClient;
		private const string _jobServiceUrl = "https://jobservice/api/job";

		public JobService(ICompanyRepository companyRepository, IHttpClientFactory httpClientFactory)
		{
			_companyRepository = companyRepository;
			_httpClient = httpClientFactory.CreateClient();
		}

		public async Task<CreateJobResponseDto> PostJobAsync(PostJobRequestDto request)
		{
			var company = await _companyRepository.GetByEmployerIdAsync(request.EmployerId);

			if (company == null)
			{
				return new CreateJobResponseDto
				{
					Success = false,
					Message = "Company not found."
				};
			}

			var jobRequest = new CreateJobRequestDto
			{
				EmployerId = request.EmployerId,
				JobSalary = request.JobSalary,
				JobTitle = request.JobTitle,
				JobLocation = request.JobLocation,
				JobType = request.JobType,
				JobSkills = request.JobSkills,
				JobTopReasons = request.JobTopReasons,
				JobDescription = request.JobDescription,
				JobResponsibility = request.JobResponsibility,
				JobRequirement = request.JobRequirement,
				JobBenefit = request.JobBenefit,
				EmployerInfo = new EmployerInfoDto
				{
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
				}
			};

			var response = await _httpClient.PostAsJsonAsync($"{_jobServiceUrl}/create", jobRequest);
			response.EnsureSuccessStatusCode();

			var result = await response.Content.ReadFromJsonAsync<CreateJobResponseDto>();
			return result;
		}

		// get jobs by employer id
		public async Task<List<JobDto>> GetJobsByEmployerIdAsync(string employerId)
		{
			var response = await _httpClient.GetAsync($"{_jobServiceUrl}/jobs-by-employer/{employerId}");
			response.EnsureSuccessStatusCode();

			var jobs = await response.Content.ReadFromJsonAsync<List<JobDto>>();
			return jobs;
		}
	}
}
