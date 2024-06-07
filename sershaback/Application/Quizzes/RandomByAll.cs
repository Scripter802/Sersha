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
        public class Query : IRequest<Quiz>
        {
            public Difficulty Difficulty { get; set; }
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
               
                var quizzes = await _context.Quizzes
                    .Include(q => q.Questions)
                        .ThenInclude(q => q.Answers)
                    .Include(q => q.Questions)
                        .ThenInclude(q => (q as GroupingQuestion).Groups)
                            .ThenInclude(g => g.GroupingItems) 
                    .ToListAsync(cancellationToken);

              
                quizzes = quizzes.Where(q => q.Difficulty == request.Difficulty && q.Type == request.Type).ToList();

                if (quizzes == null || quizzes.Count == 0)
                {
                    throw new Exception("No questions found for the specified difficulty");
                }

                Random rnd = new Random();
                int index = rnd.Next(quizzes.Count);
                return quizzes[index];
            }
        }
    }
}
