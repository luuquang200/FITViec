using NUnit.Framework;
using Moq;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using EmployerService.API.Controllers;
using EmployerService.Domain.Services;
using EmployerService.Domain.Dto;
using System.Threading.Tasks;
using EmployerService.Domain.DTO;

namespace Test
{
	public class Tests
	{
		private Mock<ICompanyService> _mockCompanyService;
		private EmployersController _controller;

		[SetUp]
		public void Setup()
		{
			_mockCompanyService = new Mock<ICompanyService>();
			_controller = new EmployersController(_mockCompanyService.Object, null);
		}

		[Test]
		public async Task CreateEmployer_ShouldReturnOk_WhenEmployerIsCreatedSuccessfully()
		{
			// Arrange
			var request = new CreateEmployerRequest { /* setup properties */ };
			var expectedResponse = new CreateEmployerResult { IsSuccess = true };

			_mockCompanyService.Setup(service => service.CreateEmployerAsync(request))
				.ReturnsAsync(expectedResponse);

			// Act
			var result = await _controller.CreateEmployer(request) as OkObjectResult;

			// Assert
			result.Should().NotBeNull();
			result.StatusCode.Should().Be(200);
			result.Value.Should().BeEquivalentTo(expectedResponse);
		}

		[Test]
		public async Task CreateEmployer_ShouldReturnBadRequest_WhenCreationFails()
		{
			// Arrange
			var request = new CreateEmployerRequest { /* setup properties */ };
			var expectedResponse = new CreateEmployerResult { IsSuccess = false, ErrorMessage = "Error" };

			_mockCompanyService.Setup(service => service.CreateEmployerAsync(request))
				.ReturnsAsync(expectedResponse);

			// Act
			var result = await _controller.CreateEmployer(request) as BadRequestObjectResult;

			// Assert
			result.Should().NotBeNull();
			result.StatusCode.Should().Be(400);
			result.Value.Should().Be("Error");
		}

		[Test]
		public async Task GetCompanyByEmployerId_ShouldReturnNotFound_WhenCompanyDoesNotExist()
		{
			// Arrange
			_mockCompanyService.Setup(service => service.GetCompanyByEmployerAsync())
				.ReturnsAsync((CompanyDto)null);

			// Act
			var result = await _controller.GetCompanyByEmployerId() as NotFoundResult;

			// Assert
			result.Should().NotBeNull();
			result.StatusCode.Should().Be(404);
		}

		[Test]
		public async Task GetCompanyByEmployerId_ShouldReturnOk_WhenCompanyExists()
		{
			// Arrange
			var company = new CompanyDto { /* setup properties */ };
			_mockCompanyService.Setup(service => service.GetCompanyByEmployerAsync())
				.ReturnsAsync(company);

			// Act
			var result = await _controller.GetCompanyByEmployerId() as OkObjectResult;

			// Assert
			result.Should().NotBeNull();
			result.StatusCode.Should().Be(200);
			result.Value.Should().BeEquivalentTo(company);
		}
	}
}
