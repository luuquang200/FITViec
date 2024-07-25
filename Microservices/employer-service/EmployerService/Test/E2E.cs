using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using EmployerService.API;
using EmployerService.Domain.Dto;
using EmployerService.Domain.DTO;
using EmployerService.Shared.Dto;
using FluentAssertions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.VisualStudio.TestPlatform.TestHost;
using Newtonsoft.Json;
using NUnit.Framework;

namespace EmployerService.E2E.Tests
{
	public class E2ETests
	{
		private HttpClient _client;

		[SetUp]
		public void Setup()
		{
			var factory = new WebApplicationFactory<Program>();
			_client = factory.CreateClient();
		}

		[Test]
		public async Task CreateEmployer_ShouldReturnOk_WhenEmployerIsCreated()
		{
			// Arrange
			var request = new CreateEmployerRequest
			{
				CompanyName = "KMS",
				CompanyType = "Product",
				CompanySize = "1000+",
				Country = "France",
				WorkingDays = "Monday - Saturday",
				OvertimePolicy = "No OT"
			};

			// Act
			var response = await _client.PostAsJsonAsync("/employer/register", request);

			// Assert
			response.EnsureSuccessStatusCode();
			var resultString = await response.Content.ReadAsStringAsync();
			var result = JsonConvert.DeserializeObject<ApiResult>(resultString);
			result.IsSuccess.Should().BeTrue();
		}

		// Add more tests here
	}
}
