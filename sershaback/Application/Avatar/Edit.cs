using System;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Persistence;
using Domain;

namespace Application.Avatar
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public IFormFile Image { get; set; }
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
                var avatarImage = await _context.AvatarImages.FindAsync(request.Id);

                if (avatarImage == null)
                {
                    throw new Exception("Avatar image not found");
                }

                
                if (!string.IsNullOrEmpty(request.Name))
                {
                    avatarImage.Name = request.Name;
                }

                if (request.Image != null)
                {
                    // Delete the old image if it exists
                    if (!string.IsNullOrEmpty(avatarImage.ImagePath))
                    {
                        var oldFilePath = Path.Combine(_env.WebRootPath, avatarImage.ImagePath);
                        if (File.Exists(oldFilePath))
                        {
                            File.Delete(oldFilePath);
                        }
                    }

                    avatarImage.ImagePath = await SaveImage(request.Image, avatarImage.Id);
                }

                _context.AvatarImages.Update(avatarImage);
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }

            private async Task<string> SaveImage(IFormFile file, Guid avatarId)
            {
                var uploadFolderPath = Path.Combine(_env.WebRootPath, "Images", "userAvatarImages");
                if (!Directory.Exists(uploadFolderPath))
                    Directory.CreateDirectory(uploadFolderPath);

                var fileName = avatarId.ToString() + Path.GetExtension(file.FileName);
                var filePath = Path.Combine(uploadFolderPath, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                return Path.Combine("Images", "userAvatarImages", fileName);
            }
        }
    }
}
