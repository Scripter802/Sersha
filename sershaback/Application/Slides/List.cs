using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Slides
{
    public class List
    {
        public class Query : IRequest<List<Slide>> { }

        public class Handler : IRequestHandler<Query, List<Slide>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Slide>> Handle(Query request, CancellationToken cancellationToken)
            {
                var slides = await _context.Slides
                    .OrderBy(x => x.Level).ThenBy(x => x.Place)
                    .ToListAsync(cancellationToken);
                return slides;
            }
        }
    }
}
