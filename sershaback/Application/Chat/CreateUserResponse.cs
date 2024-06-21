using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using Persistence;

namespace Application.Chats
{
    public class CreateUserResponse
    {
        public class Command : IRequest
        {
            public string Content { get; set; }
            public Guid NextMessageId { get; set; }
            public Guid ChatMessageId { get; set; }
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
                var response = new UserResponse
                {
                    Id = Guid.NewGuid(),
                    Content = request.Content,
                    NextMessageId = request.NextMessageId,
                    ChatMessageId = request.ChatMessageId
                };

                _context.UserResponses.Add(response);
                var success = await _context.SaveChangesAsync(cancellationToken) > 0;

                if (success) return Unit.Value;
                throw new Exception("Problem saving changes");
            }
        }
    }
}
