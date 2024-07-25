using EmployerService.Domain.Services;
using Microsoft.AspNetCore.Mvc;

namespace EmployerService.Controllers
{
	[ApiController]
	[Route("images")]
	public class ImagesController : Controller
	{
		private readonly IImageService _imageService;

		public ImagesController(IImageService imageService)
		{
			_imageService = imageService;
		}

		[HttpPost("upload")]
		public async Task<IActionResult> UploadImage(IFormFile file)
		{
			if (file == null || file.Length == 0)
			{
				return BadRequest("No file uploaded");
			}

			var fileName = await _imageService.UploadImageAsync(file);
			var baseUrl = $"{Request.Scheme}://{Request.Host}";
			var imageUrl = $"{baseUrl}/uploads/{fileName}";

			return Ok(new { Url = imageUrl });
		}
	}
}
