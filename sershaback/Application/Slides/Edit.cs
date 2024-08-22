using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Slides
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public int Level { get; set; }
            public string Name { get; set; }
            public int Place { get; set; }
            public string FilePath { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var slide = await _context.Slides.FindAsync(request.Id);
                if (slide == null) throw new Exception("Could not find slide");

                slide.Level = request.Level;
                slide.Name = request.Name;
                slide.Place = request.Place;
                slide.FilePath = request.FilePath;

                await _context.SaveChangesAsync(cancellationToken);

                return Unit.Value;
            }
        }
    }
}
