using EmployerService.API.Controllers;
using EmployerService.Domain.Services;
using EmployerService.Domain.Dto;
using Moq;
using NUnit.Framework;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using EmployerService.Domain.DTO;

namespace Test
{
	[TestFixture]
	public class EmployersControllerTests
	{
		private Mock<ICompanyService> _mockCompanyService;
		private Mock<IJobService> _mockJobService;
		private EmployersController _controller;

		[SetUp]
		public void Setup()
		{
			_mockCompanyService = new Mock<ICompanyService>();
			_mockJobService = new Mock<IJobService>();
			_controller = new EmployersController(_mockCompanyService.Object, _mockJobService.Object);
		}

		[Test]
		public async Task CreateEmployer_ReturnsOkResult_WhenCreationIsSuccessful()
		{
			// Arrange
			var request = new CreateEmployerRequest { /* initialize with test data */ };
			var expectedResponse = new CreateEmployerResult { IsSuccess = true };
			_mockCompanyService.Setup(s => s.CreateEmployerAsync(request)).ReturnsAsync(expectedResponse);

			// Act
			var result = await _controller.CreateEmployer(request);

			// Assert
			var okResult = result as OkObjectResult;
			Assert.IsNotNull(okResult);
			Assert.AreEqual(expectedResponse, okResult.Value);
		}

		[Test]
		public async Task CreateEmployer_ReturnsBadRequest_WhenCreationFails()
		{
			// Arrange
			var request = new CreateEmployerRequest { /* initialize with test data */ };
			var expectedResponse = new CreateEmployerResult { IsSuccess = false, ErrorMessage = "Error" };
			_mockCompanyService.Setup(s => s.CreateEmployerAsync(request)).ReturnsAsync(expectedResponse);

			// Act
			var result = await _controller.CreateEmployer(request);

			// Assert
			var badRequestResult = result as BadRequestObjectResult;
			Assert.IsNotNull(badRequestResult);
			Assert.AreEqual(expectedResponse.ErrorMessage, badRequestResult.Value);
		}
	}
}
