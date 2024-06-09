namespace EmployerService.Shared.Dto
{
	public class ApiResult
	{
		public bool IsSuccess { get; set; } = true;
		public string ErrorMessage { get; set; } = string.Empty;
		public List<dynamic>? Data { get; set; }
	}
}
