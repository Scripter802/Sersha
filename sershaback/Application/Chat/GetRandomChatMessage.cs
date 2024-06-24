using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using Persistence;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace Application.Chats
{
    public class GetRandomChatMessage
    {
        public class Query : IRequest<ChatMessage>
        {
        }

        public class Handler : IRequestHandler<Query, ChatMessage>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<ChatMessage> Handle(Query request, CancellationToken cancellationToken)
            {
                var messages = await _context.ChatMessages
                    .Include(m => m.Responses)
                    .ToListAsync(cancellationToken);
                
                Random random = new Random();
                var message = messages
                                .AsEnumerable()
                                .OrderBy(q => random.Next())
                                .FirstOrDefault(x=> x.Responses[0].NextMessageId != null);

                if (message == null)
                {
                    throw new Exception("Message not found");
                }

                return message;
            }
        }
    }
}
