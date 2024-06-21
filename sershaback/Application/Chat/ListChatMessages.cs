using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using Persistence;
using Microsoft.EntityFrameworkCore;

namespace Application.Chats
{
    public class ListChatMessages
    {
        public class Query : IRequest<List<ChatMessage>> { }

        public class Handler : IRequestHandler<Query, List<ChatMessage>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<ChatMessage>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.ChatMessages
                    .Include(m => m.Responses)
                    .ToListAsync(cancellationToken);
            }
        }
    }
}
