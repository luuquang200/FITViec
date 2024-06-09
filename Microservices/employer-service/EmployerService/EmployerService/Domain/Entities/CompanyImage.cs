namespace EmployerService.Domain.Entities
{
	public class CompanyImage
	{
		public string ImageId { get; set; }
		public string CompanyId { get; set; }
		public string ImageUrl { get; set; }

		// Navigation property
		public Company Company { get; set; }
	}
}
