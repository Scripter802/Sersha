using Domain;
using System.Collections.Generic;
using MediatR;
using System.Threading.Tasks;
using System.Threading;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;

namespace Application.Authors
{
    public class List
    {
        public class Query: IRequest<List<Author>>{}

        public class Handler : IRequestHandler<Query, List<Author>>
        {
            private readonly DataContext _context;
            private readonly ILogger<List> _logger;

        public ILogger<List> Logger { get;set; }

            public Handler(DataContext context, ILogger<List> logger)
            {
                _logger = logger;
                _context = context;
            }


            public async Task<List<Author>> Handle(Query request, CancellationToken cancellationToken)
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

                var authors = await _context.Authors.ToListAsync(cancellationToken);
                return authors;
                
            }
        }

    }
}