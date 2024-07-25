using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using System;
using System.Data;
using System.Diagnostics.Metrics;

namespace EmployerService.E2ETests
{
	[TestFixture]
	public class EmployersE2ETests
	{
		private IWebDriver _driver;

		[SetUp]
		public void Setup()
		{
			_driver = new ChromeDriver();
			_driver.Navigate().GoToUrl("https://fitviec-gpc3dcbsewfcffav.southeastasia-01.azurewebsites.net/employer/register"); 
		}

		[Test]
		public void CreateEmployerE2E()
		{
			// Find elements
			var companyNameInput = _driver.FindElement(By.Id("companyName"));
			var companyTypeInput = _driver.FindElement(By.Id("companyType"));
			var companySizeInput = _driver.FindElement(By.Id("companySize"));
			var countryInput = _driver.FindElement(By.Id("country"));
			var workingDaysInput = _driver.FindElement(By.Id("workingDays"));
			var overtimePolicyInput = _driver.FindElement(By.Id("overtimePolicy"));
			var registerButton = _driver.FindElement(By.Id("registerButton"));

			// Fill in the form
			companyNameInput.SendKeys("KMS");
			companyTypeInput.SendKeys("Product");
			companySizeInput.SendKeys("1000+");
			countryInput.SendKeys("France");
			workingDaysInput.SendKeys("Monday - Saturday");
			overtimePolicyInput.SendKeys("No OT");

			// Click register button
			registerButton.Click();

			// Fill in the form
			var successMessage = _driver.FindElement(By.Id("successMessage"));
			Assert.IsNotNull(successMessage);
		}

		[TearDown]
		public void Cleanup()
		{
			_driver.Quit();
		}
	}
}
