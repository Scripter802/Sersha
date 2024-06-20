using System;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Persistence;
using Domain;
using static Domain.Enums;

namespace Application.SershaItems
{
    public class Create
    {
        public class Command : IRequest<Guid>
        {
            public IFormFile Image { get; set; }
            public SershaItemType Type { get; set; }
            public SershaItemBodyPart BodyPart { get; set; }
            public string Name { get; set; }
        }

        public class Handler : IRequestHandler<Command, Guid>
        {
            private readonly DataContext _context;
            private readonly IWebHostEnvironment _env;

            public Handler(DataContext context, IWebHostEnvironment env)
            {
                _context = context;
                _env = env;
            }

            public async Task<Guid> Handle(Command request, CancellationToken cancellationToken)
            {
                var sershaItem = new SershaItem
                {
                    Id = Guid.NewGuid(),
                    Type = request.Type,
                    BodyPart = request.BodyPart,
                    Name = request.Name ?? Path.GetFileNameWithoutExtension(request.Image.FileName)
                };

                if (request.Image != null)
                {
                    sershaItem.ImagePath = await SaveImage(request.Image, sershaItem.Id);
                }

                _context.SershaItems.Add(sershaItem);
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return sershaItem.Id;

                throw new Exception("Problem saving changes");
            }

            private async Task<string> SaveImage(IFormFile file, Guid itemId)
            {
                var uploadFolderPath = Path.Combine(_env.WebRootPath, "Images", "SershaItems");
                if (!Directory.Exists(uploadFolderPath))
                    Directory.CreateDirectory(uploadFolderPath);

                var fileName = itemId.ToString() + Path.GetExtension(file.FileName);
                var filePath = Path.Combine(uploadFolderPath, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                return Path.Combine("Images", "SershaItems", fileName);
            }
        }
    }
}
