using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Domain;

namespace Application.Quizzes
{
    public class List
    {
        public class Query : IRequest<List<Quiz>> { }

        public class Handler : IRequestHandler<Query, List<Quiz>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Quiz>> Handle(Query request, CancellationToken cancellationToken)
            {
                var quizzes = await _context.Quizzes
                    .Include(q => q.Questions)
                    .ThenInclude(q => (q as RightAnswerQuestion).Answers)
                    .ToListAsync(cancellationToken);

                return quizzes;
            }
        }
    }
}
