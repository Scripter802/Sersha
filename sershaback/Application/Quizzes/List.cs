using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

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
                        .ThenInclude(q => q.Answers)
                    .ToListAsync();

                foreach (var quiz in quizzes)
                {
                    foreach (var question in quiz.Questions)
                    {
                        if (question is GroupingQuestion groupingQuestion)
                        {
                            await _context.Entry(groupingQuestion)
                                .Collection(q => q.Groups)
                                .LoadAsync();

                            foreach (var group in groupingQuestion.Groups)
                            {
                                await _context.Entry(group)
                                    .Collection(g => g.GroupingItems)
                                    .LoadAsync();
                            }
                        }
                    }
                }

                return quizzes;
            }
        }
    }
}
