using EmployerService.Domain.DTO;
using EmployerService.Domain.Entities;
using EmployerService.Infrastructure.Repositories;
using EmployerService.Shared.Dto;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Text;

namespace EmployerService.Domain.Services
{
    public interface ICompanyService
	{
		Task<CreateEmployerResult> CreateEmployerAsync(CreateEmployerRequest request);
		Task<UpdateEmployerResult> UpdateEmployerAsync(UpdateEmployerRequest request);
		Task<CompanyDto> GetCompanyByEmployerAsync();
		Task DeleteCompanyAsync(string companyId);
		Task<List<CompanyDto>> GetAllCompaniesAsync();
		Task<CreateJobResponseDto> PostJobAsync(PostJobRequestDto request);
		Task<List<JobDto>> GetListJobByEmployerAsync();
		Task<ApiResult> UpdateJobByEmployerIdAsync(UpdateJobRequest request);
		Task<ApiResult> DeleteJobByEmployerIdAsync(string employerId, string jobId);
	}
	public class CompanyService: ICompanyService
	{
		private readonly ICompanyRepository _companyRepository;
		private readonly IJobService _jobService;
		private readonly ICurrentUserService _currentUserService;

		public CompanyService(ICompanyRepository companyRepository, IJobService jobService, ICurrentUserService currentUserService)
		{
			_companyRepository = companyRepository;
			_jobService = jobService;
			_currentUserService = currentUserService;
		}

		// Create company by employer id
		public async Task<CreateEmployerResult> CreateEmployerAsync(CreateEmployerRequest request)
		{
			// Check if company already exists
			var employerId = _currentUserService.GetUserId();
			var companyExists = await _companyRepository.GetByEmployerIdAsync(employerId);
			if (companyExists != null)
			{
				return new CreateEmployerResult { IsSuccess = false, ErrorMessage = "Company already exists" };
			}
			
			var company = new Company
			{
				CompanyId = Guid.NewGuid().ToString(),
				EmployerId = employerId,
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
				Image = request.Image
			};

			// Save to database
			await _companyRepository.AddAsync(company);

			return new CreateEmployerResult { IsSuccess = true, EmployerId = employerId };
		}

		// Update company by employer id
		public async Task<UpdateEmployerResult> UpdateEmployerAsync(UpdateEmployerRequest request)
		{
			var employerId = _currentUserService.GetUserId();
			var company = await _companyRepository.GetByEmployerIdAsync(employerId);
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
			company.Image = request.Image;

			await _companyRepository.UpdateAsync(company);

			return new UpdateEmployerResult { IsSuccess = true };
		}

		// Get company by employer 
		public async Task<CompanyDto> GetCompanyByEmployerAsync()
		{
			var employerId = _currentUserService.GetUserId();
			var company = await _companyRepository.GetByEmployerIdAsync(employerId);
			if (company == null)
			{
				 return null;
			 }

			return new CompanyDto(company);
		}

		// Delete company by employer id
		public async Task DeleteCompanyAsync(string companyId)
		{
			await _companyRepository.DeleteAsync(companyId);
		}

		// Get all companies
		public async Task<List<CompanyDto>> GetAllCompaniesAsync()
		{
			var companies = await _companyRepository.GetAllCompaniesAsync();
			var companyDtos = new List<CompanyDto>();
			foreach (var company in companies)
			{
				var companyDto = new CompanyDto(company);
				companyDtos.Add(companyDto);
			}
			return companyDtos;
		}

		// Post job by employer id
		public async Task<CreateJobResponseDto> PostJobAsync(PostJobRequestDto request)
		{
			var result = await _jobService.PostJobAsync(request);

			if (result.Success)
			{
				return result;
			}

			return new CreateJobResponseDto { Success = false, Message = result.Message };
		}

		// Get list job by employer id
		public async Task<List<JobDto>> GetListJobByEmployerAsync()
		{
			var result = await _jobService.GetListJobByEmployerAsync();
			return result;
		}

		// Update job by employer id
		public async Task<ApiResult> UpdateJobByEmployerIdAsync(UpdateJobRequest request)
		{
			//var response = new ApiResult();
			//try
			//{
			//	var content = new StringContent(JsonConvert.SerializeObject(request), Encoding.UTF8, "application/json");
			//	var result = await _httpClient.PutAsync($"https://job-service.azurewebsites.net/job/update/{request.EmployerId}/{request.JobId}", content);

			//	if (result.IsSuccessStatusCode)
			//	{
			//		response.Data = await result.Content.ReadAsStringAsync();
			//		response.IsSuccess = true;
			//	}
			//	else
			//	{
			//		response.ErrorMessage = await result.Content.ReadAsStringAsync();
			//		response.IsSuccess = false;
			//	}
			//}
			//catch (Exception ex)
			//{
			//	response.ErrorMessage = ex.Message;
			//	response.IsSuccess = false;
			//}

			//return response;
			return new ApiResult();
		}

		// Delete job by employer id
		public async Task<ApiResult> DeleteJobByEmployerIdAsync(string employerId, string jobId)
		{
			//var response = new ApiResult();
			//try
			//{
			//	var result = await _httpClient.DeleteAsync($"https://job-service.azurewebsites.net/job/{employerId}/{jobId}");

			//	if (result.IsSuccessStatusCode)
			//	{
			//		response.Data = await result.Content.ReadAsStringAsync();
			//		response.IsSuccess = true;
			//	}
			//	else
			//	{
			//		response.ErrorMessage = await result.Content.ReadAsStringAsync();
			//		response.IsSuccess = false;
			//	}
			//}
			//catch (Exception ex)
			//{
			//	response.ErrorMessage = ex.Message;
			//	response.IsSuccess = false;
			//}

			//return response;
			return new ApiResult();
		}

	}
}
