using EmployerService.Domain.DTO;
using EmployerService.Domain.Entities;
using EmployerService.Infrastructure.Repositories;
using EmployerService.Shared.Dto;
using Newtonsoft.Json;
using System.Text;

namespace EmployerService.Domain.Services
{
	public interface ICompanyService
	{
		Task<CreateEmployerResult> CreateEmployerAsync(CreateEmployerRequest request);
		Task<UpdateEmployerResult> UpdateEmployerAsync(UpdateEmployerRequest request);
		Task<Company> GetCompanyByEmployerIdAsync(string employerId);
		Task DeleteCompanyAsync(string companyId);
		Task<List<CompanyDto>> GetAllCompaniesAsync();
		Task<ApiResult> PostJobAsync(PostJobRequest request);
		Task<ApiResult> GetListJobByEmployerIdAsync(string employerId);
		Task<ApiResult> UpdateJobByEmployerIdAsync(UpdateJobRequest request);
		Task<ApiResult> DeleteJobByEmployerIdAsync(string employerId, string jobId);
	}
	public class CompanyService: ICompanyService
	{
		private readonly ICompanyRepository _companyRepository;
		private readonly HttpClient _httpClient;
		public CompanyService(ICompanyRepository companyRepository, HttpClient httpClient)
		{
			_companyRepository = companyRepository;
			_httpClient = httpClient;
		}

		// Create company by employer id
		public async Task<CreateEmployerResult> CreateEmployerAsync(CreateEmployerRequest request)
		{
			
			var company = new Company
			{
				CompanyId = Guid.NewGuid().ToString(),
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
				Images = request.Images.Select(url => new CompanyImage { ImageId = Guid.NewGuid().ToString(), ImageUrl = url }).ToList()
			};

			// Save to database
			await _companyRepository.AddAsync(company);

			return new CreateEmployerResult { IsSuccess = true, CompanyId = company.CompanyId.ToString() };
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
				company.Images = request.Images.Select(url => new CompanyImage { ImageId = Guid.NewGuid().ToString(), ImageUrl = url }).ToList();
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
		public async Task DeleteCompanyAsync(string companyId)
		{
			await _companyRepository.DeleteAsync(companyId);
		}

		// Get all companies
		public async Task<List<CompanyDto>> GetAllCompaniesAsync()
		{
			return await _companyRepository.GetAllCompaniesAsync();
		}

		// Post job by employer id
		public async Task<ApiResult> PostJobAsync(PostJobRequest request)
		{
			// Check if employer 
			var company = await _companyRepository.GetByEmployerIdAsync(request.EmployerId);
			if (company == null)
			{
				return new ApiResult { IsSuccess = false, ErrorMessage = "Company not found" };
			}

			var response = new ApiResult();
			try
			{
				var content = new StringContent(JsonConvert.SerializeObject(request), Encoding.UTF8, "application/json");
				var result = await _httpClient.PostAsync("https://job-service.azurewebsites.net/job/create", content);

				if (result.IsSuccessStatusCode)
				{
					// convert response to string
					response.Data = result.Content;
					response.IsSuccess = true;
				}
				else
				{
					response.ErrorMessage = await result.Content.ReadAsStringAsync();
					response.IsSuccess = false;
				}
			}
			catch (Exception ex)
			{
				response.ErrorMessage = ex.Message;
				response.IsSuccess = false;
			}

			return response;
		}

		// Get list job by employer id
		public async Task<ApiResult> GetListJobByEmployerIdAsync(string employerId)
		{
			var response = new ApiResult();
			try
			{
				var result = await _httpClient.GetAsync($"https://job-service.azurewebsites.net/job/jobs-by-employer/{employerId}");
				
				if (result.IsSuccessStatusCode)
				{
					var jsonData = await result.Content.ReadAsStringAsync();
					var jobs = JsonConvert.DeserializeObject<List<JobDto>>(jsonData);
					response.Data = jobs;
					response.IsSuccess = true;
				}
				else
				{
					response.ErrorMessage = await result.Content.ReadAsStringAsync();
					response.IsSuccess = false;
				}
			}
			catch (Exception ex)
			{
				response.ErrorMessage = ex.Message;
				response.IsSuccess = false;
			}

			return response;
		}

		// Update job by employer id
		public async Task<ApiResult> UpdateJobByEmployerIdAsync(UpdateJobRequest request)
		{
			var response = new ApiResult();
			try
			{
				var content = new StringContent(JsonConvert.SerializeObject(request), Encoding.UTF8, "application/json");
				var result = await _httpClient.PutAsync($"https://job-service.azurewebsites.net/job/update/{request.EmployerId}/{request.JobId}", content);

				if (result.IsSuccessStatusCode)
				{
					response.Data = await result.Content.ReadAsStringAsync();
					response.IsSuccess = true;
				}
				else
				{
					response.ErrorMessage = await result.Content.ReadAsStringAsync();
					response.IsSuccess = false;
				}
			}
			catch (Exception ex)
			{
				response.ErrorMessage = ex.Message;
				response.IsSuccess = false;
			}

			return response;
		}
		
		// Delete job by employer id
		public async Task<ApiResult> DeleteJobByEmployerIdAsync(string employerId, string jobId)
		{
			var response = new ApiResult();
			try
			{
				var result = await _httpClient.DeleteAsync($"https://job-service.azurewebsites.net/job/{employerId}/{jobId}");

				if (result.IsSuccessStatusCode)
				{
					response.Data = await result.Content.ReadAsStringAsync();
					response.IsSuccess = true;
				}
				else
				{
					response.ErrorMessage = await result.Content.ReadAsStringAsync();
					response.IsSuccess = false;
				}
			}
			catch (Exception ex)
			{
				response.ErrorMessage = ex.Message;
				response.IsSuccess = false;
			}

			return response;
		}	

	}
}
