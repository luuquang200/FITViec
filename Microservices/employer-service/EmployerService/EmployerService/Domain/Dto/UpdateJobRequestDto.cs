using EmployerService.Domain.DTO;

namespace EmployerService.Domain.Dto
{
	public class UpdateJobRequestDto
	{
		public string JobId { get; set; }
		public string EmployerId { get; set; }
		public string JobSalary { get; set; }
		public string JobTitle { get; set; }
		public string JobLocation { get; set; }
		public string JobType { get; set; }
		public string JobSkills { get; set; }
		public string JobTopReasons { get; set; }
		public string JobDescription { get; set; }
		public string JobResponsibility { get; set; }
		public string JobRequirement { get; set; }
		public string JobBenefit { get; set; }
	}
}
