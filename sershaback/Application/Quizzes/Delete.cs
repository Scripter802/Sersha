using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;
using Persistence;

namespace Application.Quizzes
{
    public class Delete
    {
        public Delete()
        {
        }

        public class Command : IRequest<bool>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, bool>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<bool> Handle(Command request, CancellationToken cancellationToken)
            {
                var quiz = await _context.Quizzes.FindAsync(request.Id);
                if (quiz == null)
                {
                    return false;
                }

                _context.Quizzes.Remove(quiz);
                var success = await _context.SaveChangesAsync() > 0;
                return success;
            }
        }
    }
}
