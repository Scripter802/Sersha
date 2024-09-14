using System;
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
    public class AddToKlaviyoSubsribeList
    {
        public class Command: IRequest
        {
            public string Email { get; set; }           
        }
        
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            private readonly UserManager<AppUser> _userManager;
            private readonly KlaviyoUserManager _klaviyoUserManager;

            public Handler(DataContext context, UserManager<AppUser> userManager, KlaviyoUserManager klaviyoUserManager)
            {
                _klaviyoUserManager = klaviyoUserManager;
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
                
                await _klaviyoUserManager.addProfileToList("SMHPQ5", user.KlaviyoID);
                await _klaviyoUserManager.removeProfileFromList("WaD25M", user.KlaviyoID);

                return Unit.Value;
            }
        }
    }
}