namespace NotificationService.Config
{
	public class EmailSettings
	{
		public string SmtpHost { get; set; }
		public int SmtpPort { get; set; }
		public string SmtpUser { get; set; }
		public string SmtpPass { get; set; }
		public string EmailFromName { get; set; }
		public string EmailFrom { get; set; }
	}

}
