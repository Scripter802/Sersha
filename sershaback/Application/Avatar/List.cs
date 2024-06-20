using System.Collections.Generic;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Domain;

namespace Application.Avatar
{
    public class List
    {
        public class Query : IRequest<List<AvatarImageDTO>>
        {
        }

        public class Handler : IRequestHandler<Query, List<AvatarImageDTO>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<AvatarImageDTO>> Handle(Query request, CancellationToken cancellationToken)
            {
                var avatars = await _context.AvatarImages
                    .Include(a => a.Users)
                    .ToListAsync(cancellationToken);

                var avatarsDto = new List<AvatarImageDTO>();
                foreach (var avatar in avatars)
                {
                    avatarsDto.Add(new AvatarImageDTO
                    {
                        Id = avatar.Id,
                        ImagePath = avatar.ImagePath,
                        Name = avatar.Name
                    });
                }
                return avatarsDto;
            }
        }
    }
}
