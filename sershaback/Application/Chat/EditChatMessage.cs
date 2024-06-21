using MediatR;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using Persistence;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Application.Chats
{
    public class EditChatMessage
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Sender { get; set; }
            public string Content { get; set; }
            public List<ResponseData> Responses { get; set; } = new List<ResponseData>();

            public class ResponseData
            {
                public Guid? Id { get; set; }
                public string Content { get; set; }
                public int NextMessageIndex { get; set; }
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var chatMessage = await _context.ChatMessages
                    .Include(m => m.Responses)
                    .FirstOrDefaultAsync(m => m.Id == request.Id, cancellationToken);

                if (chatMessage == null)
                {
                    throw new Exception("Message not found");
                }

                chatMessage.Sender = request.Sender;
                chatMessage.Content = request.Content;

                var messageDictionary = new Dictionary<int, ChatMessage>();

                
                for (int i = 0; i < request.Responses.Count; i++)
                {
                    var responseData = request.Responses[i];
                    if (responseData.Id.HasValue)
                    {
                        var response = chatMessage.Responses.FirstOrDefault(r => r.Id == responseData.Id.Value);
                        if (response != null)
                        {
                            response.Content = responseData.Content;
                            if (responseData.NextMessageIndex != -1)
                            {
                                if (messageDictionary.ContainsKey(responseData.NextMessageIndex))
                                {
                                    response.NextMessageId = messageDictionary[responseData.NextMessageIndex].Id;
                                }
                                else
                                {
                                    throw new KeyNotFoundException($"The given key '{responseData.NextMessageIndex}' was not present in the dictionary.");
                                }
                            }
                            else
                            {
                                response.NextMessageId = null;
                            }
                        }
                    }
                    else
                    {
                        var response = new UserResponse
                        {
                            Id = Guid.NewGuid(),
                            Content = responseData.Content,
                            ChatMessageId = chatMessage.Id
                        };

                        if (responseData.NextMessageIndex != -1)
                        {
                            if (messageDictionary.ContainsKey(responseData.NextMessageIndex))
                            {
                                response.NextMessageId = messageDictionary[responseData.NextMessageIndex].Id;
                            }
                            else
                            {
                                throw new KeyNotFoundException($"The given key '{responseData.NextMessageIndex}' was not present in the dictionary.");
                            }
                        }

                        chatMessage.Responses.Add(response);
                        _context.UserResponses.Add(response);
                    }
                }

                var success = await _context.SaveChangesAsync(cancellationToken) > 0;
                if (success) return Unit.Value;
                throw new Exception("Problem saving changes");
            }
        }
    }
}
