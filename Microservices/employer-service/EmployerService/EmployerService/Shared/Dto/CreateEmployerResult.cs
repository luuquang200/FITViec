namespace EmployerService.Shared.Dto
{
	public class CreateEmployerResult
	{
		public bool IsSuccess { get; set; }
		public string ErrorMessage { get; set; }
		public Guid EmployerId { get; set; }
		public Guid CompanyId { get; set; }
	}
}
