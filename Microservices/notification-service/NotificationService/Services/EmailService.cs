using Grpc.Core;
using MimeKit;
using MailKit.Net.Smtp;
using NotificationService.Protos;
using NotificationService.Config;
using MailKit.Security;
using Microsoft.Extensions.Options;

namespace NotificationService.Services
{
	public class EmailService : Notification.NotificationBase
	{
		private readonly ILogger<EmailService> _logger;
		private readonly EmailSettings _emailSettings;

		public EmailService(ILogger<EmailService> logger, IOptions<EmailSettings> emailSettings)
		{
			_logger = logger;
			_emailSettings = emailSettings.Value;
		}

		public override async Task<EmailResponse> SendEmail(EmailRequest request, ServerCallContext context)
		{
			try
			{
				var emailBody = CreateHtmlEmailBody(request.Body);
				var email = CreateEmailMessage(request.To, request.Subject, emailBody);
				await SendEmailAsync(email);

				return new EmailResponse { Success = true, Message = "Email sent successfully." };
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "Error sending email.");
				return new EmailResponse { Success = false, Message = "Failed to send email." };
			}
		}
		private static string CreateHtmlEmailBody(string body)
		{
			return $@"
					<div style='background-color: #F4F4F4; padding: 20px; text-align: center;'>
						<table style='max-width: 502px; width: 100%; margin: 0 auto;'>
							<tr>
								<td style='border-radius: 8px 8px 0 0; background: linear-gradient(258deg, #54151c 0%, #121212 100%); text-align: center; padding: 10px;'>
									<table style='width: 100%;'>
										<tr>
											<td style='width: 50%; text-align: left;'>
												<img src='https://cdn.builder.io/api/v1/image/assets/TEMP/0ba11fef3d3d1c21ccf3348a58170984ed614dcad3b74f3c2fd7daf1fe323858?apiKey=1293b2add2d347908b4e11760098fdbe&'
													alt='Company Logo 1' style='width: 119px; max-width: 100%;' />
											</td>
											<td style='width: 50%; text-align: right;'>
												<img src='https://cdn.builder.io/api/v1/image/assets/TEMP/cb1027044ccda295d5e23bf883fb35e5e93a3e3eef7ba080c7c48d4c6ce7e2db?apiKey=1293b2add2d347908b4e11760098fdbe&'
													alt='Company Logo 2' style='width: 80px;' />
											</td>
										</tr>
									</table>
								</td>
							</tr>
							<tr>
								<td style='background-color: #fff; padding: 10px; border-radius: 0 0 8px 8px;'>
									<p style='font-family: Arial, sans-serif; font-size: 16px; color: #414042; font-weight: 400; line-height: 150%;'>{body}</p>
								</td>
							</tr>
							<tr>
								<td style='padding: 10px 0px; text-align: center;'>
									<table style='width: 100%;'>
										<tr>
											<td style='width: 70%; text-align: left;'>
												<a href='#' style='font-family: Arial, sans-serif; text-decoration: underline; color: #414042; font-size: 14px;'>Explore Best IT Companies in Vietnam</a>
											</td>
											<td style='width: 30%; text-align: right;'>
												<img src='https://cdn.builder.io/api/v1/image/assets/TEMP/37e46de87e724904c64c30fbf4ec98393d6239b8135fd01db71fa5ea775fdc66?apiKey=1293b2add2d347908b4e11760098fdbe&'
													alt='Explore IT Companies' style='width: 54px;' />
											</td>
										</tr>
									</table>
								</td>
							</tr>
						</table>
					</div>";
		}


		private MimeMessage CreateEmailMessage(string to, string subject, string body)
		{
			var email = new MimeMessage();
			email.From.Add(MailboxAddress.Parse($"{_emailSettings.EmailFromName} <{_emailSettings.EmailFrom}>"));
			email.To.Add(MailboxAddress.Parse(to));
			email.Subject = subject;
			email.Body = new TextPart("html") { Text = body };
			return email;
		}

		private async Task SendEmailAsync(MimeMessage email)
		{
			using var client = new SmtpClient();
			await client.ConnectAsync(_emailSettings.SmtpHost, _emailSettings.SmtpPort, SecureSocketOptions.StartTls);
			await client.AuthenticateAsync(_emailSettings.SmtpUser, _emailSettings.SmtpPass);
			await client.SendAsync(email);
			await client.DisconnectAsync(true);
		}
	}

}
