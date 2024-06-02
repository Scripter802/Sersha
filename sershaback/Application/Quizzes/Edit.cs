using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using static Domain.Enums;

namespace Application.Quizzes
{
    public class Edit
    {
        public Edit()
        {
        }

        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public QuizType Type { get; set; }
            public Difficulty Difficulty { get; set; }
            public List<QuestionDto> Questions { get; set; } = new List<QuestionDto>();
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleForEach(x => x.Questions).ChildRules(question =>
                {
                    question.RuleFor(q => q.QuestionText).NotEmpty();
                    question.RuleFor(q => q.Type).IsInEnum();
                });
                RuleFor(x => x.Difficulty).IsInEnum();
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
                    .ThenInclude(q => (q as RightAnswerQuestion).Answers)
                    .Include(q => q.Questions)
                    .ThenInclude(q => (q as GroupingQuestion).Groups)
                    .ThenInclude(g => g.GroupingItems)
                    .FirstOrDefaultAsync(q => q.Id == request.Id, cancellationToken);

                if (quiz == null)
                {
                    throw new Exception("Quiz not found");
                }

                quiz.Type = request.Type;
                quiz.Difficulty = request.Difficulty;

               
                _context.Questions.RemoveRange(quiz.Questions);
                await _context.SaveChangesAsync(cancellationToken);


                quiz.Questions.Clear();

                foreach (var questionDto in request.Questions)
                {
                    Question question = null;

                    switch (questionDto.Type)
                    {
                        case QuizType.RightAnswer:
                            question = new RightAnswerQuestion
                            {
                                Text = questionDto.QuestionText,
                                Answers = questionDto.Answers.Select(a => new Answer
                                {
                                    Text = a.Text,
                                    IsCorrect = a.IsCorrect
                                }).ToList()
                            };
                            break;
                        case QuizType.CorrectIncorrect:
                            question = new CorrectIncorrectQuestion
                            {
                                Text = questionDto.QuestionText,
                                IsCorrect = questionDto.IsCorrect
                            };
                            break;
                        case QuizType.FillInTheBlank:
                            question = new FillInTheBlankQuestion
                            {
                                Text = questionDto.QuestionText,
                                Answers = questionDto.Answers.Select(a => new Answer
                                {
                                    Text = a.Text,
                                    IsCorrect = a.IsCorrect
                                }).ToList()
                            };
                            break;
                        case QuizType.Grouping:
                            question = new GroupingQuestion
                            {
                                Text = questionDto.QuestionText,
                                Groups = questionDto.Groups.Select(g => new Group
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

                    if (question != null)
                    {
                        question.QuizId = quiz.Id;
                        quiz.Questions.Add(question);
                    }
                }

                await _context.SaveChangesAsync(cancellationToken);
                return Unit.Value;
            }
        }
    }
}
