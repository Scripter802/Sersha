using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;
using static Domain.Enums;

namespace Application.Quizzes
{
    public class Create
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

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                //RuleFor(x => x.QuestionText).NotEmpty();
                RuleFor(x => x.Type).IsInEnum();
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
                var quiz = new Quiz
                {
                    Id = Guid.NewGuid(),
                    Difficulty = request.Difficulty,
                    Type = request.Type
                };

                _context.Quizzes.Add(quiz);

                switch (request.Type)
                {
                    case QuizType.RightAnswer:
                        var rightAnswerQuestion = new RightAnswerQuestion
                        {
                            Id = Guid.NewGuid(),
                            QuizId = quiz.Id,
                            Text = request.QuestionText,
                            Answers = request.Answers.Select(a => new Answer
                            {
                                Id = Guid.NewGuid(),
                                Text = a.Text,
                                IsCorrect = a.IsCorrect,
                                QuestionId = Guid.NewGuid() 
                            }).ToList()
                        };
                        _context.RightAnswerQuestions.Add(rightAnswerQuestion);
                        break;
                    case QuizType.CorrectIncorrect:
                        var correctIncorrectQuestion = new CorrectIncorrectQuestion
                        {
                            Id = Guid.NewGuid(),
                            QuizId = quiz.Id,
                            Text = request.QuestionText,
                            IsCorrect = request.IsCorrect
                        };
                        _context.CorrectIncorrectQuestions.Add(correctIncorrectQuestion);
                        break;
                    case QuizType.FillInTheBlank:
                        var fillInTheBlankQuestion = new FillInTheBlankQuestion
                        {
                            Id = Guid.NewGuid(),
                            QuizId = quiz.Id,
                            Text = request.QuestionText,
                            Statement1 = request.Statement1,
                            Statement2 = request.Statement2,
                            Answers = request.Answers.Select(a => new Answer
                            {
                                Id = Guid.NewGuid(),
                                Text = a.Text,
                                IsCorrect = a.IsCorrect,
                                QuestionId = Guid.NewGuid() 
                            }).ToList()
                        };
                        _context.FillInTheBlankQuestions.Add(fillInTheBlankQuestion);
                        break;
                    case QuizType.Grouping:
                        var groupingQuestion = new GroupingQuestion
                        {
                            Id = Guid.NewGuid(),
                            QuizId = quiz.Id,
                            Groups = new List<Group>
                            {
                                new Group
                                {
                                    Name = request.GroupName,
                                    GroupingItems = request.Items.Select(i => new GroupingItem
                                    {
                                        Item = i
                                    }).ToList()
                                }
                            }
                        };
                        _context.GroupingQuestions.Add(groupingQuestion);
                        break;
                    default:
                        throw new Exception("Invalid question type");
                }

                var success = await _context.SaveChangesAsync(cancellationToken) > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}
