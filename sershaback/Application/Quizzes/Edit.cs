using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;
using Domain;
using System.Collections.Generic;
using static Domain.Enums;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Application.Quizzes
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public QuizType Type { get; set; }
            public Difficulty Difficulty { get; set; }
            public string QuestionText { get; set; }
            public List<AnswerDto> Answers { get; set; } = new List<AnswerDto>();
            public string Statement1 { get; set; } 
            public string Statement2 { get; set; } 
            public bool IsCorrect { get; set; } 
            public string GroupName { get; set; } 
            public List<string> Items { get; set; } = new List<string>(); 
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
                var quiz = await _context.Quizzes
                    .Include(q => q.Questions)
                        .ThenInclude(q => (q as RightAnswerQuestion).Answers)
                    .Include(q => q.Questions)
                        .ThenInclude(q => (q as FillInTheBlankQuestion).Answers)
                    .Include(q => q.Questions)
                        .ThenInclude(q => (q as GroupingQuestion).GroupingItems)
                    .FirstOrDefaultAsync(q => q.Id == request.Id, cancellationToken);

                if (quiz == null)
                {
                    throw new Exception("Quiz not found");
                }

                quiz.Difficulty = request.Difficulty;
                quiz.Type = request.Type;

                
                foreach (var question in quiz.Questions)
                {
                    switch (question)
                    {
                        case RightAnswerQuestion rightAnswerQuestion:
                            rightAnswerQuestion.Text = request.QuestionText;
                            UpdateAnswers(rightAnswerQuestion.Answers, request.Answers);
                            break;
                        case CorrectIncorrectQuestion correctIncorrectQuestion:
                            correctIncorrectQuestion.Text = request.QuestionText;
                            correctIncorrectQuestion.IsCorrect = request.IsCorrect;
                            break;
                        case FillInTheBlankQuestion fillInTheBlankQuestion:
                            fillInTheBlankQuestion.Text = request.QuestionText;
                            fillInTheBlankQuestion.Statement1 = request.Statement1;
                            fillInTheBlankQuestion.Statement2 = request.Statement2;
                            UpdateAnswers(fillInTheBlankQuestion.Answers, request.Answers);
                            break;
                        case GroupingQuestion groupingQuestion:
                            groupingQuestion.Text = request.QuestionText;
                            groupingQuestion.GroupName = request.GroupName;
                            UpdateGroupingItems(groupingQuestion.GroupingItems, request.Items);
                            break;
                    }
                }

                var success = await _context.SaveChangesAsync() > 0;

                if (!success)
                {
                    throw new Exception("Problem saving changes");
                }

                return Unit.Value;
            }

            private void UpdateAnswers(ICollection<Answer> existingAnswers, List<AnswerDto> newAnswers)
            {
                existingAnswers.Clear();
                foreach (var answerDto in newAnswers)
                {
                    existingAnswers.Add(new Answer
                    {
                        Id = Guid.NewGuid(),
                        Text = answerDto.Text,
                        IsCorrect = answerDto.IsCorrect
                    });
                }
            }

            private void UpdateGroupingItems(ICollection<GroupingItem> existingItems, List<string> newItems)
            {
                existingItems.Clear();
                foreach (var item in newItems)
                {
                    existingItems.Add(new GroupingItem
                    {
                        Id = Guid.NewGuid(),
                        Item = item
                    });
                }
            }



        }
    }
}
