using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using FluentValidation;
using MediatR;
using Persistence;
using Microsoft.AspNetCore.Http;
using System.IO;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Microsoft.AspNetCore.Identity;
using Domain;

namespace Application.User
{
    public class Edit
    {
        public class Command: IRequest
        {
            public string FullName { get; set; }
            public string Email { get; set; }
            public string OldPassword {get; set;}
            public string NewPassword { get; set; }
            public string ParentsFullName { get; set; }
            public string ParentPhoneNumber { get; set; }
            public DateTime UserBirthDate { get; set; }
            public int Level { get; set; }
            public int CoinBalance { get; set; }
            public string Type { get; set; }
            public bool isFirstTimeLoggedIn { get; set; }
            public Guid AvatarImageId { get; set; }
            
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                /*RuleFor(x=>x.Title).NotEmpty();
                RuleFor(x=>x.Content).NotEmpty();
                //RuleFor(x=>x.Author).NotEmpty();
                //RuleFor(x=>x.PublishedDate).NotEmpty();
                RuleFor(x=>x.Image).NotEmpty();
                RuleFor(x=>x.Stage).NotEmpty();
                //RuleFor(x=>x.AuthorImage).NotEmpty();*/
            }
        }
        
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            private readonly UserManager<AppUser> _userManager;

            public Handler(DataContext context, UserManager<AppUser> userManager)
            {
                _userManager = userManager;
                _context = context;
            }


            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users
                    .FirstOrDefaultAsync(u => u.Email == request.Email, cancellationToken);

                if (user == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { user = "Not found" });
                }
                user.FullName = request.FullName ?? user.FullName;
                user.ParentsFullName = request.ParentsFullName ?? user.ParentsFullName;
                user.ParentPhoneNumber = request.ParentPhoneNumber ?? user.ParentPhoneNumber;
                user.UserBirthDate = request.UserBirthDate != default ? request.UserBirthDate : user.UserBirthDate;
                user.Level = request.Level != default ? request.Level : user.Level;
                user.CoinBalance = request.CoinBalance != default ? request.CoinBalance : user.CoinBalance;
                user.Type = request.Type ?? user.Type;
                user.isFirstTimeLoggedIn = request.isFirstTimeLoggedIn;
                if(request.NewPassword != null){
                    await _userManager.ChangePasswordAsync(user, request.OldPassword, request.NewPassword);
                }
                if(request.AvatarImageId != user.AvatarImageId && request.AvatarImageId != null){
                    user.AvatarImageId = request.AvatarImageId;
                    user.AvatarImage = _context.AvatarImages.FirstOrDefault(x => x.Id == request.AvatarImageId);
                }      

                _context.Users.Update(user);
                var success = await _context.SaveChangesAsync() > 0;

                if (!success) 
                    throw new Exception("Problem saving changes!");

                return Unit.Value;
            }
        }
    }
}