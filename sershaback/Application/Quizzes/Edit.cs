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
using Microsoft.EntityFrameworkCore;
using static Domain.Enums;

namespace Application.Quizzes
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
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
                        .When(q => q.ImageFile == null)
                        .WithMessage("Either QuestionText or ImageFile must be provided.");
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
                var quiz = await _context.Quizzes
                    .Include(q => q.Questions)
                    .ThenInclude(q => q.Answers)
                    .FirstOrDefaultAsync(q => q.Id == request.Id, cancellationToken);

                if (quiz == null)
                {
                    throw new Exception("Quiz not found");
                }

                quiz.Difficulty = request.Difficulty;

                // Delete questions that are not in the new list
                var updatedQuestionIds = request.Questions.Select(q => q.Id).ToList();
                _context.Questions.RemoveRange(quiz.Questions.Where(q => !updatedQuestionIds.Contains(q.Id)));

                foreach (var questionDto in request.Questions)
                {
                    var question = quiz.Questions.FirstOrDefault(q => q.Id == questionDto.Id);
                    string questionImagePath = question?.ImagePath;

                    if (questionDto.ImageFile != null)
                    {
                        questionImagePath = await SaveImage(questionDto.ImageFile, quiz.Id, "question");
                    }

                    if (question == null)
                    {
                        question = await CreateQuestionBasedOnType(questionDto.Type, questionDto, questionImagePath);
                        question.QuizId = quiz.Id;
                        _context.Questions.Add(question);
                        quiz.Questions.Add(question);
                    }
                    else
                    {
                        question.Text = questionDto.QuestionText;
                        question.ImagePath = questionImagePath;
                        question.Answers = questionDto.Answers.Select(a => new Answer
                        {
                            Text = a.Text,
                            IsCorrect = a.IsCorrect
                        }).ToList();
                    }
                }

                _context.Quizzes.Update(quiz);
                var success = await _context.SaveChangesAsync(cancellationToken) > 0;

                if (success) return Unit.Value;
                throw new Exception("Problem saving changes");
            }


            private async Task<string> SaveImage(IFormFile imageFile, Guid quizId, string folder)
            {
                string path = Path.Combine(_env.WebRootPath, "Images", "quizImages", quizId.ToString(), folder);
                Directory.CreateDirectory(path);
                string fileName = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);
                string fullPath = Path.Combine(path, fileName);

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

                return new RightAnswerQuestion // Should dynamically instantiate based on type
                {
                    Text = questionDto.QuestionText,
                    Answers = answers,
                    ImagePath = questionImagePath
                };
            }
        }
    }
}
