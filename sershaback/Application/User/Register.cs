using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Application.Validators;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.User
{
    public class Register
    {
        public class Command: IRequest<User>
        {
            public string FullName {get; set;}
            public string Email {get; set;}
            public string Password {get; set;}
            public string ParentsFullName{get; set;}
            public string ParentPhoneNumber{get; set;}
            public DateTime UserBirthDate{get; set;}
            public Guid AvatarImageId { get; set; }
        
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x=>x.FullName).NotEmpty();
                RuleFor(x=>x.Email).NotEmpty().EmailAddress();
                RuleFor(x=>x.Password).Password();
                RuleFor(x=>x.ParentsFullName).NotEmpty();
                RuleFor(x=>x.UserBirthDate).NotEmpty();
                RuleFor(x=>x.ParentPhoneNumber).NotEmpty();  
            }

        }

        public class Handler : IRequestHandler<Command, User>
        {
            private readonly DataContext _context;
            private readonly UserManager<AppUser> _userMenager;
            private readonly IJwtGenerator _jwtGenerator;

        private readonly IKlaviyoUserManager _klaviyoUserManager;

            public Handler(DataContext context, UserManager<AppUser> userMenager, IJwtGenerator jwtGenerator, IKlaviyoUserManager klaviyoUserManager)
            {
            this._klaviyoUserManager = klaviyoUserManager;
                _userMenager=userMenager;
                _context = context;
                _jwtGenerator=jwtGenerator;
            }


            public async Task<User> Handle(Command request, CancellationToken cancellationToken)
            {
                if (await _context.Users.Where(x => x.Email == request.Email).AnyAsync())
                {
                    throw new RestException(HttpStatusCode.BadRequest, new { Email = "email already exists" });
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
                    AvatarImageId = request.AvatarImageId,
                    Type = "User",
                    Stage = 1,
                    isFirstTimeLoggedIn = true,
                    IsSubscribed = true,
                    SubscribedUntil = DateTime.Today.AddDays(1)

                };
                user.AvatarImage = _context.AvatarImages.FirstOrDefault(x=> x.Id == user.AvatarImageId);
                var klaviyoId = await _klaviyoUserManager.createProfile(user.Email, user.ParentsFullName, user.ParentPhoneNumber);
                user.KlaviyoID = klaviyoId;
                //handler logic 
                var results = await _userMenager.CreateAsync(user, request.Password);

                if(results.Succeeded)
                {
                    return new User
                    {
                        FullName =user.FullName,
                        Token = _jwtGenerator.CreateToken(user),
                        Image = null
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