using Domain;
using System.Collections.Generic;
using MediatR;
using System.Threading.Tasks;
using System.Threading;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using AutoMapper;

namespace Application.Posts
{
    public class List
    {
        public class Query: IRequest<List<PostDto>>{}

        public class Handler : IRequestHandler<Query, List<PostDto>>
        {
            private readonly DataContext _context;
            private readonly ILogger<List> _logger;
            private readonly IMapper _mapper;

            public ILogger<List> Logger { get;set; }

            public Handler(DataContext context, ILogger<List> logger, IMapper mapper)
            {
                _logger = logger;
                _context = context;
                _mapper = mapper;
            }


            public async Task<List<PostDto>> Handle(Query request, CancellationToken cancellationToken)
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

                
                var posts = _context.Posts
                    .Include(x=>x.Author)
                    .ToList();
            
                return _mapper.Map<List<Post>, List<PostDto>>(posts);
                
            }
        }

    }
}