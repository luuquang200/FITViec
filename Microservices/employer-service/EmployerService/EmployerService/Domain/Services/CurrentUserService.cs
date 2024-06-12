namespace EmployerService.Domain.Services
{
	public interface ICurrentUserService
	{
		string? GetUserId();
		string? GetToken();
	}
	public class CurrentUserService : ICurrentUserService
	{
		private readonly IHttpContextAccessor _httpContextAccessor;

		public CurrentUserService(IHttpContextAccessor httpContextAccessor)
		{
			_httpContextAccessor = httpContextAccessor;
		}

		public string? GetUserId()
		{
			return _httpContextAccessor.HttpContext?.Items["UserId"] as string;
		}

		public string? GetToken()
		{
			return _httpContextAccessor.HttpContext?.Items["Token"] as string;
		}
	}

}
