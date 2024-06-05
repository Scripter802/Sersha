using System;
using System.Diagnostics;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Posts
{
    public class Details
    {
        public class Query: IRequest<PostDto>
        {
            public Guid Id {get; set;}
        }

        public class Handler : IRequestHandler<Query, PostDto>
        {
            private readonly DataContext _context;

            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper )
            {
                _mapper = mapper;
                _context = context;
            }


            public async Task<PostDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var post = await _context.Posts
                    .Include(x => x.Author)  // Uključivanje autora ako je potrebno
                    .SingleOrDefaultAsync(x => x.Id == request.Id);

                if (post == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { post = "Not found" });
                }

                var postToReturn = _mapper.Map<Post, PostDto>(post);

                return postToReturn;
            }

        }

    }
}