using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Quizzes;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using static Domain.Enums;

namespace Application.Questions
{
    public class AddQuestion
    {
        public class Command : IRequest
        {
            public Guid QuizId { get; set; }
            public QuestionDto Question { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Question.QuestionText).NotEmpty();
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
                var quiz = await _context.Quizzes
                    .Include(q => q.Questions)
                    .FirstOrDefaultAsync(q => q.Id == request.QuizId, cancellationToken);

                if (quiz == null)
                {
                    throw new Exception("Quiz not found");
                }

                Question question = null;

                switch (quiz.Type)
                {
                    case QuizType.RightAnswer:
                        question = new RightAnswerQuestion
                        {
                            Text = request.Question.QuestionText,
                            Answers = request.Question.Answers.Select(a => new Answer
                            {
                                Text = a.Text,
                                IsCorrect = a.IsCorrect
                            }).ToList()
                        };
                        break;
                    case QuizType.CorrectIncorrect:
                        question = new CorrectIncorrectQuestion
                        {
                            Text = request.Question.QuestionText,
                            IsCorrect = request.Question.IsCorrect
                        };
                        break;
                    case QuizType.FillInTheBlank:
                        question = new FillInTheBlankQuestion
                        {
                            Text = request.Question.QuestionText,
                            Answers = request.Question.Answers.Select(a => new Answer
                            {
                                Text = a.Text,
                                IsCorrect = a.IsCorrect
                            }).ToList()
                        };
                        break;
                    case QuizType.Grouping:
                        question = new GroupingQuestion
                        {
                            Text = request.Question.QuestionText,
                            Groups = request.Question.Groups.Select(g => new Group
                            {
                                Name = g.GroupName,
                                GroupingItems = g.Items.Select(i => new GroupingItem
                                {
                                    Item = i.Item
                                }).ToList()
                            }).ToList()
                        };
                        break;
                    default:
                        throw new Exception("Invalid question type");
                }

                question.QuizId = quiz.Id;
                quiz.Questions.Add(question);

                await _context.SaveChangesAsync(cancellationToken);
                return Unit.Value;
            }
        }
    }
}
