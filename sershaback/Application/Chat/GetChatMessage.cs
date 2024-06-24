using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using Persistence;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace Application.Chats
{
    public class GetChatMessage
    {
        public class Query : IRequest<ChatMessage>
        {
            public Guid MessageId { get; set; }
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
                var message = await _context.ChatMessages
                    .Include(m => m.Responses)
                    .FirstOrDefaultAsync(m => m.Id == request.MessageId, cancellationToken);

                if (message == null)
                {
                    throw new Exception("Message not found");
                }

                //await LoadNextMessages(message.Responses, cancellationToken);

                return message;
            }

            /*private async Task LoadNextMessages(List<UserResponse> responses, CancellationToken cancellationToken)
            {
                foreach (var response in responses)
                {
                    if (response.NextMessageId.HasValue)
                    {
                        response.NextMessage = await _context.ChatMessages
                            .Include(m => m.Responses)
                            .FirstOrDefaultAsync(m => m.Id == response.NextMessageId.Value, cancellationToken);

                        if (response.NextMessage != null)
                        {
                            await LoadNextMessages(response.NextMessage.Responses, cancellationToken);
                        }
                    }
                }
            }*/
        }
    }
}
