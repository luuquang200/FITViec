using EmployerService.Domain.Entities;

namespace EmployerService.Domain.DTO
{
	public class CompanyDto
	{
		public string EmployerId { get; set; } = string.Empty;
		public string CompanyName { get; set; } = string.Empty;
		public string CompanyType { get; set; } = string.Empty;
		public string CompanySize { get; set; } = string.Empty;
		public string Country { get; set; } = string.Empty;
		public string WorkingDays { get; set; } = string.Empty;
		public string OvertimePolicy { get; set; } = string.Empty;
		public string CompanyOverview { get; set; } = string.Empty;
		public string KeySkills { get; set; } = string.Empty;
		public string WhyLoveWorkingHere { get; set; } = string.Empty;
		public string LogoUrl { get; set; } = string.Empty;
		public string Location { get; set; } = string.Empty;
		public string WorkType { get; set; } = string.Empty;
		public string Image { get; set; } = string.Empty;

		// constructor
		public CompanyDto()
		{
		}

		// constructor
		public CompanyDto(Company company)
		{
			EmployerId = company.EmployerId;
			CompanyName = company.CompanyName;
			CompanyType = company.CompanyType;
			CompanySize = company.CompanySize;
			Country = company.Country;
			WorkingDays = company.WorkingDays;
			OvertimePolicy = company.OvertimePolicy;
			CompanyOverview = company.CompanyOverview;
			KeySkills = company.KeySkills;
			WhyLoveWorkingHere = company.WhyLoveWorkingHere;
			LogoUrl = company.LogoUrl;
			Location = company.Location;
			WorkType = company.WorkType;
			Image = company.Image;
		}
	}

}
