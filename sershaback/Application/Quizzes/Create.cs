using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Persistence;
using static Domain.Enums;

namespace Application.Quizzes
{
    public class Create
    {
        public class Command : IRequest
        {
            public Difficulty Difficulty { get; set; }
            public List<QuestionDto> Questions { get; set; } = new List<QuestionDto>();
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Difficulty).IsInEnum();
                RuleForEach(x => x.Questions).ChildRules(question =>
                {
                    question.RuleFor(q => q.QuestionText)
                        .NotEmpty()
                        .When(q => q.ImageFile == null && (string.IsNullOrEmpty(q.Statement1) || string.IsNullOrEmpty(q.Statement2)))
                        .WithMessage("QuestionText or ImageFile or Statement1 and Statement2 must be filled.");

                    question.RuleFor(q => q.ImageFile)
                        .NotNull()
                        .When(q => string.IsNullOrEmpty(q.QuestionText) && (string.IsNullOrEmpty(q.Statement1) || string.IsNullOrEmpty(q.Statement2)))
                        .WithMessage("QuestionText or ImageFile or Statement1 and Statement2 must be filled.");

                    question.RuleFor(q => new { q.Statement1, q.Statement2 })
                        .Must(statements => !string.IsNullOrEmpty(statements.Statement1) && !string.IsNullOrEmpty(statements.Statement2))
                        .When(q => string.IsNullOrEmpty(q.QuestionText) && q.ImageFile == null)
                        .WithMessage("QuestionText or ImageFile or Statement1 and Statement2 must be filled.");
                });


            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IWebHostEnvironment _env;

            public Handler(DataContext context, IWebHostEnvironment env)
            {
                _context = context;
                _env = env;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var quiz = new Quiz
                {
                    Id = Guid.NewGuid(),
                    Difficulty = request.Difficulty,
                    Questions = new List<Question>()
                };

                foreach (var questionDto in request.Questions)
                {
                    string questionImagePath = null;
                    if (questionDto.ImageFile != null)
                    {
                        questionImagePath = await SaveImage(questionDto.ImageFile, quiz.Id, "question");
                    }

                    Question question = await CreateQuestionBasedOnType(questionDto.Type, questionDto, questionImagePath);
                    question.QuizId = quiz.Id;
                    quiz.Questions.Add(question);
                    _context.Questions.Add(question);
                }

                _context.Quizzes.Add(quiz);
                var success = await _context.SaveChangesAsync(cancellationToken) > 0;

                if (success) return Unit.Value;
                throw new Exception("Problem saving changes!");
            }

            private async Task<string> SaveImage(IFormFile imageFile, Guid quizId, string folder)
            {
               
                string basePath = _env.WebRootPath ?? Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
                string imagesPath = Path.Combine(basePath, "Images", "quizImages", quizId.ToString(), folder);

                Directory.CreateDirectory(imagesPath); 

                string fileName = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);
                string fullPath = Path.Combine(imagesPath, fileName);

                using (var fs = new FileStream(fullPath, FileMode.Create))
                {
                    await imageFile.CopyToAsync(fs);
                }

                return Path.Combine("/Images/quizImages", quizId.ToString(), folder, fileName);
            }

            private async Task<Question> CreateQuestionBasedOnType(QuestionType type, QuestionDto questionDto, string questionImagePath)
            {
                var answers = new List<Answer>();

                foreach (var answerDto in questionDto.Answers)
                {
                    string answerImagePath = null;
                    if (answerDto.ImageFile != null)
                    {
                        answerImagePath = await SaveImage(answerDto.ImageFile, Guid.NewGuid(), "answer");
                    }

                    var answer = new Answer
                    {
                        Text = answerDto.Text,
                        IsCorrect = answerDto.IsCorrect,
                        ImagePath = answerImagePath
                    };

                    answers.Add(answer);
                }

                switch (type)
                {
                    case QuestionType.RightAnswer:
                        return new RightAnswerQuestion
                        {
                            Text = questionDto.QuestionText,
                            Answers = answers
                        };

                    case QuestionType.CorrectIncorrect:
                        return new CorrectIncorrectQuestion
                        {
                            Text = questionDto.QuestionText,
                            IsCorrect = questionDto.IsCorrect
                        };

                    case QuestionType.FillInTheBlank:
                        return new FillInTheBlankQuestion
                        {
                            Text = questionDto.QuestionText,
                            Statement1 = questionDto.Statement1,
                            Statement2 = questionDto.Statement2,
                            Answers = answers
                        };

                    case QuestionType.Grouping:
                        return new GroupingQuestion
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

                    case QuestionType.SnapJudgement:
                        return new SnapJudgementQuestion
                        {
                            Text = questionDto.QuestionText,
                            ImagePath = questionImagePath,
                            Answers = answers
                        };

                    case QuestionType.EmojiEmotions:
                        return new EmojiEmotionsQuestion
                        {
                            Text = questionDto.QuestionText,
                            ImagePath = questionImagePath,
                            Answers = answers
                        };

                    case QuestionType.FriendOrFoe:
                        return new FriendOrFoeQuestion
                        {
                            Text = questionDto.QuestionText,
                            ImagePath = questionImagePath,
                            Answers = answers
                        };

                    case QuestionType.PostingChallenge:
                        return new PostingChallengeQuestion
                        {
                            Text = questionDto.QuestionText,
                            Content = questionDto.Content,
                            Answers = answers
                        };

                    default:
                        throw new Exception("Invalid question type");
                }
            }
        }
    }
}
