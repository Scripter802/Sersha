using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Persistence;
using Quartz;

namespace Application.User
{
    public class UpdateSubscriptionJob : IJob
    {
        private readonly ILogger<UpdateSubscriptionJob> _logger;
        private readonly DataContext _context;
        public UpdateSubscriptionJob(ILogger<UpdateSubscriptionJob> logger, DataContext context)
        {
            _context = context;
            _logger = logger;
            
        }
        public async Task Execute(IJobExecutionContext context){
            _logger.LogInformation("Executing job to update user subscription status");
            var users = _context.Users.Where(x => x.SubscribedUntil < DateTime.Now);
            foreach(var user in users){
                user.IsSubscribed = false;
            }
            _context.Users.UpdateRange(users);
            if(await _context.SaveChangesAsync() > 0){
                _logger.LogInformation("Users successfully updated.");
            }else{
                _logger.LogInformation("There was error updating users.");
            }
        }
    }
}