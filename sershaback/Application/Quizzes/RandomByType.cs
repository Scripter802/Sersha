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
    public class RandomByType
    {
        public class Query : IRequest<Quiz>
        {
            public QuizType Type { get; set; }
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
                var quizzesOfType = await _context.Quizzes
                    .Where(q => q.Type == request.Type)
                    .Include(q => q.Questions)
                    .ThenInclude(q => (q as RightAnswerQuestion).Answers)
                    .ToListAsync(cancellationToken);

                if (quizzesOfType.Count == 0)
                {
                    return null;
                }

                var randomIndex = new System.Random().Next(quizzesOfType.Count);
                var randomQuiz = quizzesOfType[randomIndex];

                return randomQuiz;
            }
        }
    }
}
