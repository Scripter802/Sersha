using MediatR;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using Persistence;

namespace Application.Chats
{
    public class CreateChatMessage
    {
        public class Command : IRequest
        {
            public List<MessageData> Messages { get; set; } = new List<MessageData>();
            public Guid SenderId { get; set; } 
            public bool IsHead { get; set; } = false; 

            public class MessageData
            {
                public string Content { get; set; }
                public List<ResponseData> Responses { get; set; } = new List<ResponseData>();
            }

            public class ResponseData
            {
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
                var messageDictionary = new Dictionary<int, ChatMessage>();

                for (int i = 0; i < request.Messages.Count; i++)
                {
                    var messageData = request.Messages[i];
                    var chatMessage = new ChatMessage
                    {
                        Id = Guid.NewGuid(),
                        SenderId = request.SenderId,
                        Content = messageData.Content,
                        Responses = new List<UserResponse>(),
                        IsHead = request.IsHead && i == 0
                    };

                    messageDictionary[i] = chatMessage;
                    _context.ChatMessages.Add(chatMessage);
                }

                var success = await _context.SaveChangesAsync(cancellationToken) > 0;
                if (!success) throw new Exception("Problem saving messages");

                foreach (var kvp in messageDictionary)
                {
                    var messageIndex = kvp.Key;
                    var chatMessage = kvp.Value;
                    var messageData = request.Messages[messageIndex];

                    foreach (var responseData in messageData.Responses)
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

                success = await _context.SaveChangesAsync(cancellationToken) > 0;
                if (success) return Unit.Value;
                throw new Exception("Problem saving responses");
            }
        }
    }
}
