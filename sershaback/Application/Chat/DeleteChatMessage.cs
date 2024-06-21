using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;
using Persistence;

namespace Application.Chats
{
    public class DeleteChatMessage
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
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
                var message = await _context.ChatMessages.FindAsync(request.Id);

                if (message == null)
                {
                    throw new Exception("Message not found");
                }

                _context.ChatMessages.Remove(message);

                var success = await _context.SaveChangesAsync(cancellationToken) > 0;

                if (success) return Unit.Value;
                throw new Exception("Problem saving changes");
            }
        }
    }
}
