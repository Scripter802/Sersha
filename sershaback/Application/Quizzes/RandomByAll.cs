using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;
using Domain;
using static Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace Application.Quizzes
{
    public class RandomByAll
    {
        public class Query : IRequest<Question>
        {
            public Difficulty Difficulty { get; set; }
            public int NumberOfQuestions { get; set; }
        }

        public class Handler : IRequestHandler<Query, Question>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Question> Handle(Query request, CancellationToken cancellationToken)
            {
                var questions = await _context.Questions
                    .Include(q => (q as RightAnswerQuestion).Answers)
                    .Include(q => (q as FillInTheBlankQuestion).Answers)
                    .Include(q => (q as GroupingQuestion).GroupingItems)
                    .Where(q => q.Quiz.Difficulty == request.Difficulty)
                    .ToListAsync(cancellationToken);

                if (questions == null || questions.Count == 0)
                {
                    throw new Exception("No questions found for the specified difficulty");
                }

                Random rnd = new Random();
                int index = rnd.Next(questions.Count);
                return questions[index];
            }
        }
    }
}
