using FirebaseAdmin.Auth;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using System.Linq;
using System.Threading.Tasks;

namespace EmployerService.API.Middlewares
{
	public class FirebaseAuthenticationMiddleware
	{
		private readonly RequestDelegate _next;
		private readonly IHttpContextAccessor _httpContextAccessor;

		public FirebaseAuthenticationMiddleware(RequestDelegate next, IHttpContextAccessor httpContextAccessor)
		{
			_next = next;
			_httpContextAccessor = httpContextAccessor;
		}

		public async Task InvokeAsync(HttpContext context)
		{
			var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

			if (token != null)
			{
				try
				{
					var decodedToken = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(token);
					var uid = decodedToken.Uid;
					context.Items["UserId"] = uid;
					context.Items["Token"] = token;
				}
				catch (Exception)
				{
					context.Response.StatusCode = StatusCodes.Status401Unauthorized;
					await context.Response.WriteAsync("Unauthorized");
					return;
				}
			}
			else
			{
				context.Response.StatusCode = StatusCodes.Status401Unauthorized;
				await context.Response.WriteAsync("Unauthorized");
				return;
			}

			await _next(context);
		}
	}
}
