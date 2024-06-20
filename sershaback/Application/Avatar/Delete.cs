using System;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Hosting;
using Persistence;
using Domain;

namespace Application.Avatar
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
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

                if (!string.IsNullOrEmpty(avatarImage.ImagePath))
                {
                    var filePath = Path.Combine(_env.WebRootPath, avatarImage.ImagePath);
                    if (File.Exists(filePath))
                    {
                        File.Delete(filePath);
                    }
                }

                _context.AvatarImages.Remove(avatarImage);
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem deleting avatar image");
            }
        }
    }
}
