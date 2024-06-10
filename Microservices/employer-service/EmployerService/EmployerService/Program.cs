using Microsoft.EntityFrameworkCore;
using EmployerService.Infrastructure.Data;
using EmployerService.Infrastructure.Repositories;
using EmployerService.Domain.Services;
using System.Text.Json;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers().AddJsonOptions(x =>
	x.JsonSerializerOptions.ReferenceHandler = null); 

// Configure the DbContext with SQL Server
builder.Services.AddDbContext<ApplicationDbContext>(options =>
	options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Register the repository
builder.Services.AddScoped<ICompanyRepository, CompanyRepository>();

// Register the service
builder.Services.AddScoped<ICompanyService, CompanyService>();
builder.Services.AddScoped<IImageService, ImageService>();
builder.Services.AddHttpClient();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//builder.WebHost.ConfigureKestrel(options =>
//{
//	options.ListenAnyIP(8080);
//});

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseAuthorization();

app.MapControllers();

app.Run();