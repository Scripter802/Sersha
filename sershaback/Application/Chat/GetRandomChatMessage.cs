using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using Persistence;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using Application.Chat;
using Application.Authors;


namespace Application.Chats
{
    public class GetRandomChatMessage
    {
        public class Query : IRequest<ChatMessageDTO>
        {
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
                var messages = await _context.ChatMessages
                    .Where(x => x.IsHead == true)
                    .Include(m => m.Sender)
                    .Include(m => m.Responses)
                    .ThenInclude(r => r.NextMessage)
                    .ToListAsync(cancellationToken);

                Random random = new Random();
                
                var message = messages.ElementAt(random.Next() % messages.Count());

                if (message == null)
                {
                    throw new Exception("Message not found");
                }

                await LoadNextMessagesAndAuthors(message.Responses, cancellationToken);

                return MapToDTO(message);
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

            private ChatMessageDTO MapToDTO(ChatMessage message)
            {
                var dto = new ChatMessageDTO
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
                        NextMessageId = r.NextMessageId,
                        NextMessage = r.NextMessage
                    }).ToList()
                };

                return dto;
            }
        }

    }
}
