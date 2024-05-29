using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Domain;
using static Domain.Enums;

namespace Application.Quizzes
{
    public class RandomByDifficulty
    {
        public class Query : IRequest<Quiz>
        {
            public Difficulty Difficulty { get; set; }
        }

        public class Handler : IRequestHandler<Query, Quiz>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Quiz> Handle(Query request, CancellationToken cancellationToken)
            {
                var quizzes = await _context.Quizzes
                    .Include(q => q.Questions)
                    .ThenInclude(q => ((RightAnswerQuestion)q).Answers)
                    .Where(q => q.Difficulty == request.Difficulty)
                    .ToListAsync(cancellationToken);

                if (!quizzes.Any())
                {
                    return null;
                }

                Random rnd = new Random();
                int index = rnd.Next(quizzes.Count);
                return quizzes[index];
            }
        }
    }
}
