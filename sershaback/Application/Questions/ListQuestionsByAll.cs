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
    public class ListQuestionsByAll
    {
        public class Query : IRequest<List<Question>>
        {
            public Difficulty Difficulty { get; set; }
            public QuizType Type { get; set; }  
        }

        public class Handler : IRequestHandler<Query, List<Question>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Question>> Handle(Query request, CancellationToken cancellationToken)
            {

                var questions = await _context.Questions
                                    .Where(q => q.Quiz.Difficulty == request.Difficulty && q.Quiz.Type == request.Type)
                                    .Include( q => q.Answers).ToListAsync(cancellationToken);

                if (questions == null || questions.Count == 0)
                {
                    throw new Exception("No questions found for the specified difficulty and type");
                }

                return questions;
            }
        }
    }
}
