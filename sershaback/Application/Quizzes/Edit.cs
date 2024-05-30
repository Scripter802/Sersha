using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Domain;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Application.Errors;
using System.Net;

namespace Application.Quizzes
{

    public class Edit : IRequest
    {
        public Guid Id { get; set; }
        public Question UpdatedQuestion { get; set; }
    }

    public class EditQuestionHandler : IRequestHandler<Edit>
    {
        private readonly DataContext _context;

        public EditQuestionHandler(DataContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(Edit request, CancellationToken cancellationToken)
        {
            var question = await _context.Questions
                .Include(q => ((RightAnswerQuestion)q).Answers)
                .Include(q => ((FillInTheBlankQuestion)q).Answers)
                .Include(q => ((GroupingQuestion)q).Groups)
                .FirstOrDefaultAsync(q => q.Id == request.Id, cancellationToken);


            if (question == null)
            {
                throw new RestException(HttpStatusCode.NotFound, new { Question = "Not found" });
            }

            switch (question)
            {
                case RightAnswerQuestion raq when request.UpdatedQuestion is RightAnswerQuestion updatedRaq:
                    raq.Text = updatedRaq.Text;
                   
                    break;
                case CorrectIncorrectQuestion ciq when request.UpdatedQuestion is CorrectIncorrectQuestion updatedCiq:
                    ciq.Text = updatedCiq.Text;
                    ciq.IsCorrect = updatedCiq.IsCorrect;
                    break;
                case FillInTheBlankQuestion fitbq when request.UpdatedQuestion is FillInTheBlankQuestion updatedFitbq:
                    fitbq.Text = updatedFitbq.Text;
                    fitbq.Statement1 = updatedFitbq.Statement1;
                    fitbq.Statement2 = updatedFitbq.Statement2;
                    break;
                case GroupingQuestion gq when request.UpdatedQuestion is GroupingQuestion updatedGq:
                    gq.Text = updatedGq.Text;
                   
                    break;
                default:
                    throw new RestException(HttpStatusCode.BadRequest, new { Error = "Invalid question type for editing" });
            }

            _context.Update(question);
            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
