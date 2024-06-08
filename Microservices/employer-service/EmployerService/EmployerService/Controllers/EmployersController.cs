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
	}
}
