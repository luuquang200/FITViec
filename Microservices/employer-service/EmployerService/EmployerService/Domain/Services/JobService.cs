using EmployerService.Domain.Dto;
using EmployerService.Domain.DTO;
using EmployerService.Infrastructure.Repositories;
using EmployerService.Shared.Dto;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Net.Http.Headers;
using System.Reflection.Metadata;
using System.Text.Json;

namespace EmployerService.Domain.Services
{
	public interface IJobService
	{
		Task<List<JobDto>> GetListJobByEmployerAsync();
		Task<CreateJobResponseDto> PostJobAsync(PostJobRequestDto request);
		Task<UpdateJobReponseDto> UpdateJobByEmployerAsync(UpdateJobRequestDto request);
		Task<DeleteJobResponseDto> DeleteJobByEmployerAsync(string jobId);
	}

	public class JobService : IJobService
	{
		private readonly ICompanyRepository _companyRepository;
		private readonly ICurrentUserService _currentUserService;
		private readonly HttpClient _httpClient;
		private const string _jobServiceUrl = "https://job-service.azurewebsites.net/job";
		private const string _jobSearchServiceUrl = "https://job-search-service.azurewebsites.net/job-elastic";

		public JobService(ICompanyRepository companyRepository, IHttpClientFactory httpClientFactory, ICurrentUserService currentUserService)
		{
			_companyRepository = companyRepository;
			_httpClient = httpClientFactory.CreateClient();
			_currentUserService = currentUserService;
		}

		public async Task<CreateJobResponseDto> PostJobAsync(PostJobRequestDto request)
		{

			try
			{
				var employerId = _currentUserService.GetUserId();
				var token = _currentUserService.GetToken();
				var company = await _companyRepository.GetByEmployerIdAsync(employerId);

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
					EmployerId = company.CompanyId,
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

				var requestMessage = new HttpRequestMessage(HttpMethod.Post, $"{_jobServiceUrl}/create")
				{
					Content = JsonContent.Create(jobRequest)
				};

				// set token to header
				requestMessage.Headers.Add("Authorization", token);

				var response = await _httpClient.SendAsync(requestMessage);

				if (response.StatusCode == System.Net.HttpStatusCode.Unauthorized)
				{
					return new CreateJobResponseDto
					{
						Success = false,
						Message = "Unauthorized. Please check your token."
					};
				}

				response.EnsureSuccessStatusCode();

				return new CreateJobResponseDto
				{
					Success = true,
					Message = "Create success"
				};
			}
			catch (Exception ex)
			{
				return new CreateJobResponseDto
				{
					Success = false,
					Message = $"Exception: {ex.Message}"
				};
			}
		}


		// get jobs by employer
		public async Task<List<JobDto>> GetListJobByEmployerAsync()
		{
			var employerId = _currentUserService.GetUserId();
			var token = _currentUserService.GetToken();
			var company = await _companyRepository.GetByEmployerIdAsync(employerId);

			if (company == null)
			{
				return new List<JobDto>();
			}

			var requestMessage = new HttpRequestMessage(HttpMethod.Get, $"{_jobSearchServiceUrl}/jobs-by-employer-id/{company.CompanyId}");
			// set token to header
			requestMessage.Headers.Add("Authorization", token);

			var response = await _httpClient.SendAsync(requestMessage);

			if (response.StatusCode == System.Net.HttpStatusCode.Unauthorized)
			{
				return new List<JobDto>();
			}

			response.EnsureSuccessStatusCode();

			var responseContent = await response.Content.ReadAsStringAsync();
			if (string.IsNullOrEmpty(responseContent))
			{
				return new List<JobDto>();
			}

			var jobs = System.Text.Json.JsonSerializer.Deserialize<List<JobDto>>(responseContent, new JsonSerializerOptions
			{
				PropertyNameCaseInsensitive = true
			});
			if (jobs == null)
			{
				return new List<JobDto>();
			}
			return jobs;
		}

		// Update job by employer 
		public async Task<UpdateJobReponseDto> UpdateJobByEmployerAsync(UpdateJobRequestDto request)
		{
			var employerId = _currentUserService.GetUserId();
			var token = _currentUserService.GetToken();
			var company = await _companyRepository.GetByEmployerIdAsync(employerId);

			if (company == null)
			{
				return new UpdateJobReponseDto
				{
					Success = false,
					Message = "Company not found."
				};
			}

			var jobRequest = new CreateJobRequestDto
			{
				EmployerId = company.CompanyId,
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

			var requestMessage = new HttpRequestMessage(HttpMethod.Post, $"{_jobServiceUrl}/update/{request.JobId}")
			{
				Content = JsonContent.Create(jobRequest)
			};

			// set token to header
			requestMessage.Headers.Add("Authorization", token);

			var response = await _httpClient.SendAsync(requestMessage);

			if (response.StatusCode == System.Net.HttpStatusCode.Unauthorized)
			{
				return new UpdateJobReponseDto
				{
					Success = false,
					Message = "Unauthorized. Please check your token."
				};
			}

			response.EnsureSuccessStatusCode();

			return new UpdateJobReponseDto
			{
				Success = true,
				Message = "Update success"
			};
		}

		// Delete job by employer
		public async Task<DeleteJobResponseDto> DeleteJobByEmployerAsync(string jobId)
		{
			var employerId = _currentUserService.GetUserId();
			var token = _currentUserService.GetToken();
			var company = await _companyRepository.GetByEmployerIdAsync(employerId);

			if (company == null)
			{
				return new DeleteJobResponseDto
				{
					Success = false,
					Message = "Company not found."
				};
			}

			var requestMessage = new HttpRequestMessage(HttpMethod.Delete, $"{_jobServiceUrl}/delete/{jobId}");

			// set token to header
			requestMessage.Headers.Add("Authorization", token);

			var response = await _httpClient.SendAsync(requestMessage);

			if (response.StatusCode == System.Net.HttpStatusCode.Unauthorized)
			{
				return new DeleteJobResponseDto
				{
					Success = false,
					Message = "Unauthorized. Please check your token."
				};
			}

			response.EnsureSuccessStatusCode();

			return new DeleteJobResponseDto
			{
				Success = true,
				Message = "Delete success"
			};
		}

	}

	
}
