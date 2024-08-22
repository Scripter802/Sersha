using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Slides
{
    public class Delete
    {
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
                var slide = await _context.Slides.FindAsync(request.Id);
                if (slide == null) return false;

                _context.Slides.Remove(slide);
                var success = await _context.SaveChangesAsync(cancellationToken) > 0;
                return success;
            }
        }
    }
}
