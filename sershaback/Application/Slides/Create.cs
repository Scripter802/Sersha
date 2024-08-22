using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Slides
{
    public class Create
    {
        public class Command : IRequest
        {
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
                var slide = new Slide
                {
                    Id = Guid.NewGuid(),
                    Level = request.Level,
                    Name = request.Name,
                    Place = request.Place,
                    FilePath = request.FilePath
                };

                _context.Slides.Add(slide);
                await _context.SaveChangesAsync(cancellationToken);
                return Unit.Value;
            }
        }
    }
}
