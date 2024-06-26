using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using Persistence;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using Application.Chat;
using Application.Authors;
using System.Linq;

namespace Application.Chats
{
    public class GetChatMessage
    {
        public class Query : IRequest<ChatMessageDTO>
        {
            public Guid MessageId { get; set; }
        }

       public class Handler : IRequestHandler<Query, ChatMessageDTO>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<ChatMessageDTO> Handle(Query request, CancellationToken cancellationToken)
            {
                var message = await _context.ChatMessages
                    .Include(m => m.Sender) 
                    .Include(m => m.Responses)
                    .ThenInclude(r => r.NextMessage) 
                    .FirstOrDefaultAsync(m => m.Id == request.MessageId, cancellationToken);

                if (message == null)
                {
                    throw new Exception("Message not found");
                }

                await LoadNextMessagesAndAuthors(message.Responses, cancellationToken);

                return MapToDto(message);
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

            private ChatMessageDTO MapToDto(ChatMessage message)
            {
                return new ChatMessageDTO
                {
                    Id = message.Id,
                    Content = message.Content,
                    IsHead = message.IsHead,
                    Sender = new AuthorDto
                    {
                        
                        Id = message.Sender.Id,
                        AuthorName = message.Sender.AuthorName
                    },
                    Responses = message.Responses.Select(r => new UserResponseDTO
                    {
                        Id = r.Id,
                        Content = r.Content,
                        NextMessageId = r.NextMessageId
                    }).ToList()
                };
            }
        }

    }
}
