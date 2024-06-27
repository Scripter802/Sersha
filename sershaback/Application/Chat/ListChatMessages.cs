using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Application.Chat;
using Application.Authors;
using System.Linq;

namespace Application.Chats
{
    public class ListChatMessages
    {
        public class Query : IRequest<List<ChatMessageDTO>> { }

        public class Handler : IRequestHandler<Query, List<ChatMessageDTO>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<ChatMessageDTO>> Handle(Query request, CancellationToken cancellationToken)
            {
                var messages = await _context.ChatMessages
                    .Include(m => m.Sender)
                    .Include(m => m.Responses)
                    .ThenInclude(r => r.NextMessage)
                    .ToListAsync(cancellationToken);

                return messages.Select(m => MapToDto(m)).ToList();
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
                        NextMessageId = r.NextMessageId,
                    }).ToList()
                };
            }
        }

    }
}
