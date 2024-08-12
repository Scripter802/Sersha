using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.User
{
    public class Login
    {
        public class Query : IRequest<User>
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }

        public class QueryValidator : AbstractValidator<Query>
        {
            public QueryValidator()
            {
                RuleFor(x => x.Email).NotEmpty();
                RuleFor(x => x.Password).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Query, User>
        {
            private readonly SignInManager<AppUser> _signInManager;
            private readonly UserManager<AppUser> _userManager;
            private readonly IJwtGenerator _jwtGenerator;
            private readonly DataContext _context;

            public Handler(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, IJwtGenerator jwtGenerator, DataContext context)
            {
                _jwtGenerator = jwtGenerator;
                _signInManager = signInManager;
                _userManager = userManager;
                _context = context;
            }

            public async Task<User> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByEmailAsync(request.Email);
                if (user == null)
                {
                    throw new RestException(HttpStatusCode.Unauthorized);
                }

                var result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);
                if (result.Succeeded)
                {
                    
                    var image = _context.AvatarImages.FirstOrDefault(x => x.Id == user.AvatarImageId)?.ImagePath ?? null;
                    return new User
                    {
                        FullName = user.FullName,
                        Token = _jwtGenerator.CreateToken(user),
                        isFirstTimeLoggedIn = user.isFirstTimeLoggedIn,
                        Image = image,
                        Level = user.Level,
                        CoinBalance = user.CoinBalance,
                        Stage = user.Stage,
                        UserBirthDate = user.UserBirthDate,
                        ParentPhoneNumber = user.ParentPhoneNumber,
                        ParentsFullName = user.ParentsFullName,
                        Email = user.Email,

                    };
                }
                throw new RestException(HttpStatusCode.Unauthorized);
            }
        }
    }
}
