using EmployerService.Domain.DTO;
using EmployerService.Domain.Entities;
using EmployerService.Domain.Services;
using EmployerService.Shared.Dto;
using Microsoft.AspNetCore.Mvc;

namespace EmployerService.Controllers
{
	[ApiController]
	[Route("employer")]
	public class EmployersController : Controller
	{
		private readonly ICompanyService _employerService;

		public EmployersController(ICompanyService employerService)
		{
			_employerService = employerService;
		}

		[Route("register")]
		[HttpPost]
		public async Task<IActionResult> CreateEmployer(CreateEmployerRequest request)
		{
			var result = await _employerService.CreateEmployerAsync(request);
			if (!result.IsSuccess)
			{
				return BadRequest(result.ErrorMessage);
			}

			return Ok(result);
		}

		[Route("update")]
		[HttpPut]
		public async Task<IActionResult> UpdateEmployer(UpdateEmployerRequest request)
		{
			var result = await _employerService.UpdateEmployerAsync(request);
			if (!result.IsSuccess)
			{
				return BadRequest(result.ErrorMessage);
			}

			return Ok(result);
		}

		// get company by employer id
		[Route("get")]
		[HttpGet]
		public async Task<IActionResult> GetCompanyByEmployerId(string employerId)
		{
			var company = await _employerService.GetCompanyByEmployerIdAsync(employerId);
			if (company == null)
			{
				return NotFound();
			}

			return Ok(company);
		}

		//get all companies
		[Route("get-all")]
		[HttpGet]
		public async Task<ApiResult> GetAllCompanies()
		{
			var companies = await _employerService.GetAllCompaniesAsync();
			return new ApiResult
			{
				IsSuccess = true,
				Data = companies
			};
		}

		// api test
		[Route("test")]
		[HttpGet]
		public IActionResult Test()
		{
			return Ok("Employer service is running");
		}

		// Post job with employer id
		[Route("post-job")]
		[HttpPost]
		public async Task<IActionResult> PostJob(PostJobRequest request)
		{
			var result = await _employerService.PostJobAsync(request);
			if (!result.IsSuccess)
			{
				return BadRequest(result.ErrorMessage);
			}

			return Ok(result);
		}

		// Get all jobs by employer id
		[Route("get-all-jobs")]
		[HttpGet]
		public async Task<IActionResult> GetListJobByEmployerId(string employerId)
		{
			var result = await _employerService.GetListJobByEmployerIdAsync(employerId);
			if (!result.IsSuccess)
			{
				return BadRequest(result.ErrorMessage);
			}

			return Ok(result);
		}

		// Update job by employer id
		[Route("update-job")]
		[HttpPut]
		public async Task<IActionResult> UpdateJob(UpdateJobRequest request)
		{
			var result = await _employerService.UpdateJobByEmployerIdAsync(request);
			if (!result.IsSuccess)
			{
				return BadRequest(result.ErrorMessage);
			}

			return Ok(result);
		}

		// Delete job by employer id
		[Route("delete-job")]
		[HttpDelete]
		public async Task<IActionResult> DeleteJob(string employerId,string jobId)
		{
			var result = await _employerService.DeleteJobByEmployerIdAsync(employerId, jobId);
			if (!result.IsSuccess)
			{
				return BadRequest(result.ErrorMessage);
			}

			return Ok(result);
		}
	}
}
