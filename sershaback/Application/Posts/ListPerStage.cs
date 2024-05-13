using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Posts
{
    public class ListPerStage
    {
         public class Query: IRequest<List<Post>>
         {
            public string Stage {get; set;}
         }

        public class Handler : IRequestHandler<Query, List<Post>>
        {
            private readonly DataContext _context;
            private readonly ILogger<List> _logger;

        public ILogger<List> Logger { get;set; }

            public Handler(DataContext context, ILogger<List> logger)
            {
                _logger = logger;
                _context = context;
            }


            public async Task<List<Post>> Handle(Query request, CancellationToken cancellationToken)
            {
                try
                {
                    
                    cancellationToken.ThrowIfCancellationRequested();
                    await Task.Delay(1, cancellationToken);
                    _logger.LogInformation($"Task has completed");
                    
                }
                catch(Exception ex) when (ex is TaskCanceledException)
                {
                    _logger.LogInformation("Task was cancelled");
                }

                var posts = await _context.Posts.Where(x=>x.Stage == request.Stage).ToListAsync(cancellationToken);
                return posts;
                
            }

            

        }
    }
}