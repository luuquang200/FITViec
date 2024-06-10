namespace EmployerService.Shared.Dto
{
	public class PostJobRequest
	{
		public string EmployerId { get; set; }
		public string JobTitle { get; set; }
		public string JobDescription { get; set; }
		public string JobLocation { get; set; }
		public string JobType { get; set; }
		public string JobCategory { get; set; }
		public string JobSalary { get; set; }
		public string PostedAt { get; set; }
		public string ClosingAt { get; set; }
	}
}
