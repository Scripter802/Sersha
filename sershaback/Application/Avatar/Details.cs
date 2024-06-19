using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Domain;

namespace Application.Avatar
{
    public class Details
    {
        public class Query : IRequest<AvatarImageDTO>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, AvatarImageDTO>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<AvatarImageDTO> Handle(Query request, CancellationToken cancellationToken)
            {
                var avatar = await _context.AvatarImages
                    .Include(a => a.Users) 
                    .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

                if (avatar == null)
                {
                    throw new Exception("Avatar not found");
                }

                return new AvatarImageDTO
                {
                    Id = avatar.Id,
                    ImagePath = avatar.ImagePath,
                    Name = avatar.Name
                };
            }
        }
    }
}
