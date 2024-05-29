using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;
using Domain;
using Microsoft.EntityFrameworkCore;
using Application.Errors;
using System.Net;

namespace Application.Quizzes
{
    public class Details
    {
        public class Query : IRequest<Quiz>
        {
            public Guid Id { get; set; }
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
                var quiz = await _context.Quizzes
                    .Include(q => q.Questions)
                    .ThenInclude(q => (q as RightAnswerQuestion).Answers)
                    .FirstOrDefaultAsync(q => q.Id == request.Id, cancellationToken);

                if (quiz == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { Quiz = "Not found" });
                }

                return quiz;
            }
        }
    }
}
