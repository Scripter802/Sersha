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
using Microsoft.EntityFrameworkCore;
using Persistence;
using Microsoft.AspNetCore.Http;

using static Domain.Enums;

namespace Application.Quizzes
{
    public class Edit
    {
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
                    question.RuleFor(q => q.QuestionText)
                        .NotEmpty()
                        .When(q => q.ImageFile == null)
                        .WithMessage("Either QuestionText or ImageFile must be provided.");
                });
                RuleFor(x => x.Difficulty).IsInEnum();
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
                var quiz = await _context.Quizzes
                    .Include(q => q.Questions)
                    .ThenInclude(q => q.Answers)
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
                    string questionImagePath = null;
                    if (questionDto.ImageFile != null)
                    {
                        questionImagePath = await SaveImage(questionDto.ImageFile, quiz.Id, "question");
                    }

                    Question question = await CreateQuestionBasedOnType(request.Type, questionDto, questionImagePath);
                    question.QuizId = quiz.Id;
                    quiz.Questions.Add(question);
                    _context.Questions.Add(question);
                }

                var success = await _context.SaveChangesAsync(cancellationToken) > 0;

                if (success) return Unit.Value;
                throw new Exception("Problem saving changes!");
            }

            private async Task<string> SaveImage(IFormFile imageFile, Guid quizId, string folder)
            {
                string path = Directory.GetCurrentDirectory() + "\\Images\\quizImages\\" + quizId + "\\" + folder;
                FileInfo fi = new FileInfo(imageFile.FileName);
                string fileName = Guid.NewGuid().ToString() + fi.Extension;
                Directory.CreateDirectory(path);
                path = Path.Combine(path, fileName);

                using (var fs = new FileStream(path, FileMode.Create))
                {
                    await imageFile.CopyToAsync(fs);
                }
                return "/Images/quizImages/" + quizId + "/" + folder + "/" + fileName;
            }

            private async Task<Question> CreateQuestionBasedOnType(QuizType type, QuestionDto questionDto, string questionImagePath)
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
                    case QuizType.RightAnswer:
                        return new RightAnswerQuestion
                        {
                            Text = questionDto.QuestionText,
                            Answers = answers
                        };

                    case QuizType.CorrectIncorrect:
                        return new CorrectIncorrectQuestion
                        {
                            Text = questionDto.QuestionText,
                            IsCorrect = questionDto.IsCorrect
                        };

                    case QuizType.FillInTheBlank:
                        return new FillInTheBlankQuestion
                        {
                            Text = questionDto.QuestionText,
                            Statement1 = questionDto.Statement1,
                            Statement2 = questionDto.Statement2,
                            Answers = answers
                        };

                    case QuizType.Grouping:
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

                    case QuizType.SnapJudgement:
                        return new SnapJudgementQuestion
                        {
                            Text = questionDto.QuestionText,
                            ImagePath = questionImagePath,
                            Answers = answers
                        };

                    case QuizType.EmojiEmotions:
                        return new EmojiEmotionsQuestion
                        {
                            Text = questionDto.QuestionText,
                            ImagePath = questionImagePath,
                            Answers = answers
                        };

                    case QuizType.FriendOrFoe:
                        return new FriendOrFoeQuestion
                        {
                            Text = questionDto.QuestionText,
                            ImagePath = questionImagePath,
                            Answers = answers
                        };

                    case QuizType.PostingChallenge:
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
