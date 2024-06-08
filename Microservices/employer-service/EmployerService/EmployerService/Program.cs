using Microsoft.EntityFrameworkCore;
using EmployerService.Infrastructure.Data;
using EmployerService.Infrastructure.Repositories;
using EmployerService.Domain.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

// Configure the DbContext with SQL Server
builder.Services.AddDbContext<ApplicationDbContext>(options =>
	options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Register the repository
builder.Services.AddScoped<ICompanyRepository, CompanyRepository>();

// Register the service
builder.Services.AddScoped<ICompanyService, CompanyService>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
