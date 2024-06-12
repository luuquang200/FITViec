using Microsoft.EntityFrameworkCore;
using EmployerService.Infrastructure.Data;
using EmployerService.Infrastructure.Repositories;
using EmployerService.Domain.Services;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.IO;
using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using EmployerService.API.Middlewares;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.WebHost.ConfigureKestrel(options =>
{
	options.ListenAnyIP(8080);
});

// Add services to the container.
builder.Services.AddControllers().AddJsonOptions(x =>
	x.JsonSerializerOptions.ReferenceHandler = null);

// Get the path to the certificate
var certPath = Path.Combine(builder.Environment.ContentRootPath, "certs", "DigiCertGlobalRootCA.crt.pem");

// Configure the DbContext with MySQL using Pomelo
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
	var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
	options.UseMySql(connectionString.Replace("certs/DigiCertGlobalRootCA.crt.pem", certPath), new MySqlServerVersion(new Version(8, 0, 28)));
});

// Initialize Firebase Admin SDK
FirebaseApp.Create(new AppOptions()
{
    Credential = GoogleCredential.FromFile("secrets/fit-viec-firebase-adminsdk.json")
});

// Configure Authentication
builder.Services
	.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
	.AddJwtBearer(options =>
	{
		options.Authority = "https://securetoken.google.com/fit-viec";
		options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
		{
			ValidateIssuer = true,
			ValidIssuer = "https://securetoken.google.com/fit-viec",
			ValidateAudience = true,
			ValidAudience = "fit-viec",
			ValidateLifetime = true
		};
	});

// Register the repository
builder.Services.AddScoped<ICompanyRepository, CompanyRepository>();

// Register the service
builder.Services.AddScoped<ICompanyService, CompanyService>();
builder.Services.AddScoped<IImageService, ImageService>();
builder.Services.AddScoped<IJobService, JobService>();
builder.Services.AddHttpClient();
builder.Services.AddHttpContextAccessor();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

// Configure CORS
builder.Services.AddCors(options =>
{
	options.AddDefaultPolicy(builder =>
	{
		builder.AllowAnyOrigin()
			   .AllowAnyMethod()
			   .AllowAnyHeader();
	});
});


// Configure Swagger/OpenAPI
builder.Services.AddSwaggerGen(c =>
{
	c.SwaggerDoc("v1", new OpenApiInfo { Title = "Employer Service API", Version = "v1" });

	// Configure Swagger to use the JWT bearer token
	var securityScheme = new OpenApiSecurityScheme
	{
		Name = "Authorization",
		Type = SecuritySchemeType.Http,
		Scheme = "bearer",
		BearerFormat = "JWT",
		In = ParameterLocation.Header,
		Description = "JWT Authorization header using the Bearer scheme.",

		Reference = new OpenApiReference
		{
			Type = ReferenceType.SecurityScheme,
			Id = "Bearer"
		}
	};

	c.AddSecurityDefinition("Bearer", securityScheme);

	c.AddSecurityRequirement(new OpenApiSecurityRequirement
	{
		{
			new OpenApiSecurityScheme
			{
				Reference = new OpenApiReference
				{
					Type = ReferenceType.SecurityScheme,
					Id = "Bearer"
				}
			},
			Array.Empty<string>()
		}
	});
});


var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseAuthentication(); // Add this line to use authentication
app.UseAuthorization();

app.UseMiddleware<FirebaseAuthenticationMiddleware>();
app.MapControllers();

app.Run();