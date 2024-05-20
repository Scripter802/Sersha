using System;
using System.Data;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;
using Microsoft.AspNetCore.Http;
using System.IO;
using System.Linq;
using Microsoft.EntityFrameworkCore;


namespace Application.Posts
{
    public class Create
    {
         public class Command: IRequest
         {
            public Guid Id {get; set;}
            public string Title {get;set;}
            public string Content { get; set; }
            public IFormFile Image {get; set;}
            public string Stage{get; set;}
            public string Type {get; set;}
            public Guid AuthorId{get;set;}
         }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x=>x.Title).NotEmpty();
                RuleFor(x=>x.Stage).NotEmpty();
                RuleFor(x=>x.Type).NotEmpty();
                RuleFor(x=>x.AuthorId).NotEmpty();
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
                var author =await _context.Authors.FirstOrDefaultAsync(x=>x.Id == request.AuthorId);

                var post = new Post
                {
                    Id = request.Id,
                    Title = request.Title,
                    Content = request.Content,
                    PublishedDate = DateTime.Now,
                    Stage = request.Stage,
                    Type = request.Type,
                    Author = author,
                    AuthorId = request.AuthorId
                    
                };
                
                String path = Directory.GetCurrentDirectory() + "\\Images\\postImages\\" + request.Stage;
                if(request.Image != null){
                    string fileName = request.Title + request.Image.FileName;
                    Directory.CreateDirectory(path);
                    path = Path.Combine(path, fileName);

                    using (var fs = new FileStream(path, FileMode.Create)){
                        await request.Image.CopyToAsync(fs);
                    }
                    post.ImagePath = "/Images/postImages/" + request.Stage + fileName;
                }

                


                _context.Posts.Add(post);
                var success = await _context.SaveChangesAsync() > 0 ;

                if(success) return Unit.Value;
                throw new Exception("Problem saving changes!");
            }
        }

    }
}