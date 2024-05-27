using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Persistence;

namespace Application.User
{
    public class List
    {
        public class Query : IRequest<List<AppUser>> { }

        public class Handler : IRequestHandler<Query, List<AppUser>>
        {
            private readonly DataContext _context;
            private readonly ILogger<Handler> _logger;

            public Handler(DataContext context, ILogger<Handler> logger)
            {
                _context = context;
                _logger = logger;
            }

            public async Task<List<AppUser>> Handle(Query request, CancellationToken cancellationToken)
            {
                try
                {
                    cancellationToken.ThrowIfCancellationRequested();
                    await Task.Delay(1, cancellationToken);
                    _logger.LogInformation("Task has completed");
                }
                catch (Exception ex) when (ex is TaskCanceledException)
                {
                    _logger.LogInformation("Task was cancelled");
                }

                var users = await _context.Users.ToListAsync(cancellationToken); 
                return users;
            }
        }
    }
}
