namespace EmployerService.Shared.Dto
{
	public class ApiResult
	{
		public bool IsSuccess { get; set; }
		public string ErrorMessage { get; set; }
		public List<dynamic> Data { get; set; }
	}
}
