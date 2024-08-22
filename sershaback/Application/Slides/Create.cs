using System;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Persistence;
using Microsoft.AspNetCore.Hosting;

namespace Application.Slides
{
    public class Create
    {
        public class Command : IRequest
        {
            public int Level { get; set; }
            public string Name { get; set; }
            public int Place { get; set; }
            public IFormFile SlideImage { get; set; }
            public string FilePath { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IWebHostEnvironment _env;

            public Handler(DataContext context, IWebHostEnvironment env)
            {
                _context = context;
                _env = env;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var slide = new Slide
                {
                    Id = Guid.NewGuid(),
                    Level = request.Level,
                    Name = request.Name,
                    Place = request.Place
                };

                if (request.SlideImage != null)
                {
                    string uploadFolder = Path.Combine(_env.WebRootPath, "Images", "slides", slide.Name);
                    if (!Directory.Exists(uploadFolder))
                    {
                        Directory.CreateDirectory(uploadFolder);
                    }

                    string fileName = Guid.NewGuid().ToString() + Path.GetExtension(request.SlideImage.FileName);
                    string filePath = Path.Combine(uploadFolder, fileName);

                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await request.SlideImage.CopyToAsync(fileStream);
                    }

                    slide.FilePath = $"/Images/slides/{slide.Name}/{fileName}";
                }

                _context.Slides.Add(slide);
                int numberOfChanges = await _context.SaveChangesAsync(cancellationToken);

                if (numberOfChanges == 0)
                {
                    throw new Exception("Problem saving changes");
                }

                return Unit.Value;
            }
        }
    }
}
