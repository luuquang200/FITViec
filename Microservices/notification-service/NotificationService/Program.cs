using Microsoft.Extensions.Configuration;
using NotificationService.Config;
using NotificationService.Services;

var builder = WebApplication.CreateBuilder(args);

// Additional configuration is required to successfully run gRPC on macOS.
// For instructions on how to configure Kestrel and gRPC clients on macOS, visit https://go.microsoft.com/fwlink/?linkid=2099682

// Add services to the container.
builder.Services.AddOptions<EmailSettings>().Bind(builder.Configuration.GetSection("EmailSettings"));
builder.Services.AddGrpc();

builder.WebHost.ConfigureKestrel(options =>
{
	options.ListenAnyIP(8081);
	options.ListenAnyIP(8585, listenOptions =>
	{
		listenOptions.Protocols = Microsoft.AspNetCore.Server.Kestrel.Core.HttpProtocols.Http2;
	});
});

var app = builder.Build();

// Configure the HTTP request pipeline.
app.MapGrpcService<EmailService>();

app.MapGet("/", () => "Communication with gRPC endpoints must be made through a gRPC client. To learn how to create a client, visit: https://go.microsoft.com/fwlink/?linkid=2086909");

app.Run();
