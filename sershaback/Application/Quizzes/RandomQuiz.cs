using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Domain;

namespace Application.Quizzes
{
    public class RandomQuiz
    {
        public class Query : IRequest<Quiz> { }

        public class Handler : IRequestHandler<Query, Quiz>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Quiz> Handle(Query request, CancellationToken cancellationToken)
            {
                var totalQuizzes = await _context.Quizzes.CountAsync(cancellationToken);
                if (totalQuizzes == 0)
                {
                    return null;
                }

                var randomIndex = new System.Random().Next(totalQuizzes);
                var randomQuiz = await _context.Quizzes
                    .Include(q => q.Questions)
                    .ThenInclude(q => (q as RightAnswerQuestion).Answers)
                    .Skip(randomIndex)
                    .Take(1)
                    .FirstOrDefaultAsync(cancellationToken);

                return randomQuiz;
            }
        }
    }
}
