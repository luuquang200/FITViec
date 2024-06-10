# Use the official .NET 6 SDK as a build stage
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build

# Set the working directory
WORKDIR /app

# Copy csproj and restore as distinct layers
COPY *.csproj ./
RUN dotnet restore

# Copy everything else and build
COPY . ./
RUN dotnet publish -c Release -o out

# Use the official ASP.NET runtime as the base image
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS runtime

# Set the working directory
WORKDIR /app

# Copy the build output
COPY --from=build /app/out ./

# Expose port 8080
EXPOSE 8080

# Set the entry point for the application
ENTRYPOINT ["dotnet", "EmployerService.dll"]