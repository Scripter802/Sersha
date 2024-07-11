using MediatR;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Quizzes
{
    public class DeleteQuestion
    {
       
        public class Command : IRequest<bool>
        {
            public Guid QuizId { get; set; } 
            public Guid QuestionId { get; set; } 
        }

       
        public class Handler : IRequestHandler<Command, bool>
        {
            private readonly DataContext _context; 

            public Handler(DataContext context)
            {
                _context = context; 
            }

            public async Task<bool> Handle(Command request, CancellationToken cancellationToken)
            {
                var quiz = await _context.Quizzes
                    .Include(q => q.Questions) 
                    .FirstOrDefaultAsync(q => q.Id == request.QuizId, cancellationToken); 

                if (quiz == null)
                {
                    return false; 
                }

                var question = quiz.Questions.FirstOrDefault(q => q.Id == request.QuestionId); 
                if (question == null)
                {
                    return false;
                }

                quiz.Questions.Remove(question);
                _context.Questions.Remove(question);

                var success = await _context.SaveChangesAsync(cancellationToken) > 0; 
                return success; 
            }
        }
    }
}
