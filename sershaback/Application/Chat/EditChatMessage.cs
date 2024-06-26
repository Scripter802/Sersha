using MediatR;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using Persistence;

namespace Application.Chats
{
    public class EditChatMessage
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; } 
            public string Content { get; set; } 
            public List<ResponseEditData> Responses { get; set; } = new List<ResponseEditData>();

            public class ResponseEditData
            {
                public Guid Id { get; set; } 
                public string Content { get; set; } 
                public int? NextMessageIndex { get; set; } 
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
                var chatMessage = await _context.ChatMessages.FindAsync(request.Id);
                if (chatMessage == null)
                {
                    throw new Exception("Chat message not found");
                }

                chatMessage.Content = request.Content; 

                foreach (var responseEdit in request.Responses)
                {
                    var response = await _context.UserResponses.FindAsync(responseEdit.Id);
                    if (response != null)
                    {
                        response.Content = responseEdit.Content; 

                        if (responseEdit.NextMessageIndex.HasValue)
                        {
                            response.NextMessageId = _context.ChatMessages.Find(responseEdit.NextMessageIndex.Value)?.Id;
                        }
                    }
                }

                var success = await _context.SaveChangesAsync(cancellationToken) > 0;
                if (!success)
                {
                    throw new Exception("Problem saving changes");
                }

                return Unit.Value;
            }
        }
    }
}
