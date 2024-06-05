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
                var quiz = new Quiz
                {
                    Id = Guid.NewGuid(),
                    Difficulty = request.Difficulty,
                    Type = request.Type,
                    Questions = new List<Question>()
                };

                _context.Quizzes.Add(quiz);

                foreach (var questionDto in request.Questions)
                {
                    Question question = null;

                    switch (questionDto.Type)
                    {
                        case QuizType.RightAnswer:
                            var rightAnswerQuestion = new RightAnswerQuestion
                            {
                                Text = questionDto.QuestionText,
                                Answers = questionDto.Answers.Select(a => new Answer
                                {
                                    Text = a.Text,
                                    IsCorrect = a.IsCorrect
                                }).ToList()
                            };
                            quiz.Questions.Add(rightAnswerQuestion);
                            break;
                        case QuizType.CorrectIncorrect:
                            question = new CorrectIncorrectQuestion
                            {
                                Text = questionDto.QuestionText,
                                IsCorrect = questionDto.IsCorrect
                            };
                            break;
                        case QuizType.FillInTheBlank:
                            var fillInTheBlankQuestion = new FillInTheBlankQuestion
                            {
                                Text = questionDto.QuestionText,
                                Answers = questionDto.Answers.Select(a => new Answer
                                {
                                    Text = a.Text,
                                    IsCorrect = a.IsCorrect
                                }).ToList()
                            };
                            quiz.Questions.Add(fillInTheBlankQuestion);
                            break;

                        case QuizType.Grouping:
                            var groupingQuestion = new GroupingQuestion
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
                            quiz.Questions.Add(groupingQuestion);
                            break;



                        default:
                            throw new Exception("Invalid question type");
                    }

                    if (question != null)
                    {
                        question.QuizId = quiz.Id;
                        _context.Questions.Add(question);
                    }
                }

                await _context.SaveChangesAsync(cancellationToken);
                return Unit.Value;
            }

        }
    }
}
