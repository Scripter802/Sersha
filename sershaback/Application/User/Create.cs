using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;
using Microsoft.AspNetCore.Http;
using System.IO;
using Microsoft.EntityFrameworkCore;
using Application.Validators;
using Microsoft.AspNetCore.Identity;
using Application.Interfaces;
using Application.Errors;

namespace Application.User
{
    public class Create
    {
        public class Command : IRequest<User>
        {
            public string FullName { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
            public string ParentsFullName { get; set; }
            public string ParentPhoneNumber { get; set; }
            public DateTime UserBirthDate { get; set; }
            public bool? isFirstTimeLoggedIn { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.FullName).NotEmpty();
                RuleFor(x => x.Email).NotEmpty().EmailAddress();
                RuleFor(x => x.Password).Password();
                RuleFor(x => x.ParentsFullName).NotEmpty();
                RuleFor(x => x.ParentPhoneNumber).NotEmpty();
                RuleFor(x => x.UserBirthDate).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command, User>
        {
            private readonly UserManager<AppUser> _userMenager;
            private readonly DataContext _context;
            private readonly IJwtGenerator _jwtGenerator;

             public Handler(DataContext context, UserManager<AppUser> userMenager, IJwtGenerator jwtGenerator)
            {
                _userMenager=userMenager;
                _context = context;
                _jwtGenerator=jwtGenerator;
            }

            public async Task<User> Handle(Command request, CancellationToken cancellationToken)
            {
               
                if (await _context.Users.AnyAsync(x => x.Email == request.Email))
                {
                    throw new Exception("Email already exists");
                }

                var user = new AppUser
                {
                    FullName = request.FullName,
                    Email = request.Email,
                    UserName = request.Email,
                    Level = 1,
                    CoinBalance = 0,
                    ParentsFullName = request.ParentsFullName,
                    ParentPhoneNumber = request.ParentPhoneNumber,
                    UserBirthDate = request.UserBirthDate,
                    Type = "User",
                    Stage = 1,
                    isFirstTimeLoggedIn = true
                };

                var results = await _userMenager.CreateAsync(user, request.Password);

                if (results.Succeeded)
                {
                    return new User
                    {
                        FullName = user.FullName,
                        Email = user.Email,
                        Type = user.Type,
                        Stage = user.Stage
                    };
                }

                if (!results.Succeeded)
                {
                    var errors = results.Errors.Select(e => e.Description);
                    throw new RestException(HttpStatusCode.BadRequest, new {errors = errors});
                }
                    
                throw new Exception("Problem creating user!");
                }
            }
    }
}
