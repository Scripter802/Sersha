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
                    .Include(m => m.Sender) 
                    .Include(m => m.Responses)
                    .ThenInclude(r => r.NextMessage)
                    .Where(x => x.Responses.Any(r => r.NextMessageId != null))
                    .ToListAsync(cancellationToken);

                Random random = new Random();
                var message = messages
                                .OrderBy(q => random.Next())
                                .FirstOrDefault();

                if (message == null)
                {
                    throw new Exception("Message not found");
                }

                await LoadNextMessagesAndAuthors(message.Responses, cancellationToken);

                return message;
            }

            private async Task LoadNextMessagesAndAuthors(List<UserResponse> responses, CancellationToken cancellationToken)
            {
                foreach (var response in responses)
                {
                    if (response.NextMessageId.HasValue)
                    {
                        response.NextMessage = await _context.ChatMessages
                            .Include(m => m.Sender) 
                            .Include(m => m.Responses)
                            .FirstOrDefaultAsync(m => m.Id == response.NextMessageId.Value, cancellationToken);

                        if (response.NextMessage != null)
                        {
                            await LoadNextMessagesAndAuthors(response.NextMessage.Responses, cancellationToken);
                        }
                    }
                }
            }
        }
    }
}
