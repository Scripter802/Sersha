using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Domain;
using System;

namespace Application.User
{
    public class CurrentUser
    {
        public class Query : IRequest<User> { }

        public class Handler : IRequestHandler<Query, User>
        {
            private readonly UserManager<AppUser> _userManager;
            private readonly IHttpContextAccessor _httpContextAccessor;

            public Handler(UserManager<AppUser> userManager, IHttpContextAccessor httpContextAccessor)
            {
                _userManager = userManager;
                _httpContextAccessor = httpContextAccessor;
            }

            public async Task<User> Handle(Query request, CancellationToken cancellationToken)
            {
                var claims = _httpContextAccessor.HttpContext.User?.Claims;
                if (claims == null)
                {
                    Console.WriteLine("Claims are null");
                    throw new Exception("User is not authenticated or claims are not available");
                }

                var email = claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier || c.Type == "sub")?.Value;
                if (string.IsNullOrEmpty(email))
                {
                    Console.WriteLine("Email is null or empty");
                    throw new Exception("User is not authenticated or email is not available");
                }

                Console.WriteLine($"User email retrieved: {email}");

                var user = await _userManager.FindByEmailAsync(email);
                if (user == null)
                {
                    Console.WriteLine($"User not found for email: {email}");
                    throw new Exception("User not found");
                }

                Console.WriteLine($"User found: {user.Email}");

                return new User
                {
                    FullName = user.FullName,
                    Email = user.Email,
                    ParentsFullName = user.ParentsFullName,
                    Level = user.Level,
                    CoinBalance = user.CoinBalance,
                    ParentPhoneNumber = user.ParentPhoneNumber,
                    UserBirthDate = user.UserBirthDate,
                    Type = user.Type
                };
            }
        }
    }
}
