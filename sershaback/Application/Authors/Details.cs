using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Persistence;

namespace Application.Authors
{
    public class Details
    {
        public class Query : IRequest<Author>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Author>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Author> Handle(Query request, CancellationToken cancellationToken)
            {
                var author = await _context.Authors.FindAsync(request.Id);
                if (author == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { author = "Not found" });
                }
                return author;
            }
        }
    }
}
