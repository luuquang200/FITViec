namespace EmployerService.Domain.Services
{
	public interface IImageService
	{
		Task<string> UploadImageAsync(IFormFile file);
	}
	public class ImageService : IImageService
	{
		private readonly IWebHostEnvironment _env;

		public ImageService(IWebHostEnvironment env)
		{
			_env = env;
		}

		public async Task<string> UploadImageAsync(IFormFile file)
		{
			if (file == null || file.Length == 0)
			{
				throw new ArgumentException("File is invalid");
			}

			var uploads = Path.Combine(_env.WebRootPath, "uploads");
			if (!Directory.Exists(uploads))
			{
				Directory.CreateDirectory(uploads);
			}

			var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
			var filePath = Path.Combine(uploads, fileName);

			using (var stream = new FileStream(filePath, FileMode.Create))
			{
				await file.CopyToAsync(stream);
			}

			return fileName;
		}
	}
}
