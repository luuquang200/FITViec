namespace EmployerService.Domain.Entities
{
	public class CompanyImage
	{
		public Guid ImageId { get; set; }
		public Guid CompanyId { get; set; }
		public string ImageUrl { get; set; }

		// Navigation property
		public Company Company { get; set; }
	}
}
