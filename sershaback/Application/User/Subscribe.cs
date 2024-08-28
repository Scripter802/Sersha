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
using static Domain.Enums;

namespace Application.User
{
    public class Subscribe
    {
        public class Command: IRequest
        {
            public string Email { get; set; }
            public SubscribtionPeriod subscribtionPeriod {get; set;}            
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
                    .Where(u => u.Email == request.Email)
                    .FirstOrDefaultAsync();

                if (user == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { user = "Not found" });
                }
                
                var subscribeFrom = DateTime.Today;

                if(subscribeFrom < user.SubscribedUntil){
                    subscribeFrom = user.SubscribedUntil;
                }
                if(request.subscribtionPeriod == SubscribtionPeriod.Monthly){
                    user.SubscribedUntil = subscribeFrom.AddMonths(1);
                    user.IsSubscribed = true;
                }

                if(request.subscribtionPeriod == SubscribtionPeriod.Yearly){
                    user.SubscribedUntil = subscribeFrom.AddYears(1);
                    user.IsSubscribed = true;
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