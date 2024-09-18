using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.User
{
    public class ResetPasswordEmail{
        public class Command: IRequest
        {
            public string Email { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            private readonly UserManager<AppUser> _userManager;
        private readonly IEmailSender _emailSender;

            public Handler(DataContext context, UserManager<AppUser> userManager, IEmailSender emailSender)
            {
                _emailSender = emailSender;
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
                var token = await _userManager.GeneratePasswordResetTokenAsync(user);

                var resetLink = $"https://game.sersha.ai/resetPassword?token={token}&email={user.Email}";
                Console.WriteLine(resetLink);
                Console.WriteLine(user.Email);
                await _emailSender.SendEmailAsync(user.Email, "Reset Password", $"Please reset your password by clicking <a href='{resetLink}'>here</a>.");
                
                return Unit.Value;


            }
        }
    }
}