using System;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Domain;
using static Domain.Enums;

namespace Application.SershaItems
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public IFormFile Image { get; set; }
            public SershaItemType? Type { get; set; }
            public SershaItemBodyPart? BodyPart { get; set; }
            public string Name { get; set; }
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
                var sershaItem = await _context.SershaItems.FindAsync(request.Id);

                if (sershaItem == null)
                {
                    throw new Exception("SershaItem not found");
                }

                sershaItem.Type = request.Type ?? sershaItem.Type;
                sershaItem.BodyPart = request.BodyPart ?? sershaItem.BodyPart;
                sershaItem.Name = request.Name ?? sershaItem.Name;

                if (request.Image != null)
                {
                    sershaItem.ImagePath = await SaveImage(request.Image, sershaItem.Id);
                }

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

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
