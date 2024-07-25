using EmployerService.Domain.Dto;
using EmployerService.Domain.DTO;
using EmployerService.Domain.Services;
using EmployerService.Shared.Dto;
using Microsoft.AspNetCore.Mvc;

namespace EmployerService.API.Controllers
{
    [ApiController]
    [Route("employer")]
    public class EmployersController : Controller
    {
        private readonly ICompanyService _employerService;
        private readonly IJobService _jobService;

        public EmployersController(ICompanyService employerService, IJobService jobService)
        {
            _employerService = employerService;
            _jobService = jobService;
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
        public async Task<IActionResult> GetCompanyByEmployerId()
        {
            var company = await _employerService.GetCompanyByEmployerAsync();
            if (company == null)
            {
                return NotFound();
            }

            return Ok(company);
        }

		[Route("get-by-id")]
		[HttpGet]
        public async Task<IActionResult> GetCompanyById(string employerId)
        {
			var company = await _employerService.GetCompanyByIdAsync(employerId);
			if (company == null)
            {
				return NotFound();
			}

			return Ok(company);
		}

		// delete company by company id
		[Route("delete")]
        [HttpDelete]
        public async Task DeleteCompany(string companyId)
        {
			await _employerService.DeleteCompanyAsync(companyId);
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

		//get top companies
		[Route("get-top")]
		[HttpGet]
		public async Task<ApiResult> GetTopCompanies()
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
        [HttpPost("post-job")]
        public async Task<IActionResult> PostJob([FromBody] PostJobRequestDto request)
        {
            var result = await _jobService.PostJobAsync(request);

            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        // Get all jobs by employer id
        [Route("get-all-jobs")]
        [HttpGet]
        public async Task<IActionResult> GetListJobByEmployer()
        {
            var result = await _employerService.GetListJobByEmployerAsync();
            return Ok(result);
        }

        // Update job by employer id
        [Route("update-job")]
        [HttpPut]
        public async Task<IActionResult> UpdateJob(UpdateJobRequestDto request)
        {
            var result = await _employerService.UpdateJobByEmployerAsync(request);
            return Ok(result);
        }

        // Delete job by employer id
        [Route("delete-job")]
        [HttpDelete]
        public async Task<IActionResult> DeleteJob(string jobId)
        {
            var result = await _employerService.DeleteJobByEmployerAsync(jobId);
            return Ok(result);
        }
    }
}
