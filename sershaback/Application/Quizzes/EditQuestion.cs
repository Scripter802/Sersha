using MediatR;
using System;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Domain;
using Microsoft.AspNetCore.Hosting;
using static Domain.Enums;

namespace Application.Quizzes
{
    public class EditQuestion
    {
        public class Command : IRequest<bool>
        {
            public Guid QuizId { get; set; }      
            public Guid QuestionId { get; set; }   
            public string Text { get; set; }      
            public QuestionType Type { get; set; } 
            public IFormFile ImageFile { get; set; } 
        }

        public class Handler : IRequestHandler<Command, bool>
        {
            private readonly DataContext _context;
            private readonly IWebHostEnvironment _env;

            public Handler(DataContext context, IWebHostEnvironment env)
            {
                _context = context;
                _env = env;
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

                var question = quiz.Questions.Find(q => q.Id == request.QuestionId);
                if (question == null)
                {
                    return false; 
                }

                question.Text = request.Text ?? question.Text;
                question.Type = request.Type;

                if (request.ImageFile != null)
                {
                    if (!string.IsNullOrEmpty(question.ImagePath))
                    {
                        var oldImagePath = Path.Combine(_env.WebRootPath, question.ImagePath);
                        if (File.Exists(oldImagePath))
                        {
                            File.Delete(oldImagePath);
                        }
                    }

                    string imagePath = Path.Combine("Images", Guid.NewGuid().ToString() + Path.GetExtension(request.ImageFile.FileName));
                    string fullPath = Path.Combine(_env.WebRootPath, imagePath);
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        await request.ImageFile.CopyToAsync(stream);
                    }

                    question.ImagePath = imagePath;
                }

                _context.Questions.Update(question);
                var success = await _context.SaveChangesAsync(cancellationToken) > 0;
                return success;
            }
        }
    }
}
