using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Questions
{
    public class Details
    {
        public class Query : IRequest<Question>
        {
            public Guid Id { get; set; }
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
                var question = await _context.Questions
                    .Include(q => (q as RightAnswerQuestion).Answers)
                    .Include(q => (q as GroupingQuestion).Groups)
                    .ThenInclude(g => g.GroupingItems)
                    .FirstOrDefaultAsync(q => q.Id == request.Id, cancellationToken);

                if (question == null)
                {
                    throw new Exception("Question not found");
                }

                return question;
            }
        }
    }
}
