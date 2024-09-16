using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.User
{
    public class ResetPassword
    {
        public class Command: IRequest
        {
            public string Email { get; set; }
            public string Token { get; set; }
            public string Password { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            private readonly UserManager<AppUser> _userManager;
            public Handler(DataContext context, UserManager<AppUser> userManager){
                _userManager = userManager;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users
                    .Where(u => u.Email == request.Email)
                    .FirstOrDefaultAsync();

                if (user == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { user = "Not found" });
                }

                var result = await _userManager.ResetPasswordAsync(user, request.Token, request.Password);
                if (result.Succeeded)
                {
                    return Unit.Value;
                }else{
                    throw new RestException(HttpStatusCode.BadRequest, new {errors = "Problem Saving Changes"});
                }
            }
        }
    }
}