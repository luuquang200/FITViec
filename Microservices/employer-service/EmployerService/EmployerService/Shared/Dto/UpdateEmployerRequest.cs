namespace EmployerService.Shared.Dto
{
	public class UpdateEmployerRequest
	{
		public string EmployerId { get; set; }
		public string CompanyName { get; set; }
		public string? CompanyOverview { get; set; }
		public string? CompanyType { get; set; }
		public string? CompanySize { get; set; }
		public string? Country { get; set; }
		public string? WorkingDays { get; set; }
		public string? OvertimePolicy { get; set; }
		public string? KeySkills { get; set; }
		public string? WhyLoveWorkingHere { get; set; }
		public string? LogoUrl { get; set; }
		public string? Location { get; set; }
		public string? WorkType { get; set; }
		public string? Image { get; set; }
	}
}
