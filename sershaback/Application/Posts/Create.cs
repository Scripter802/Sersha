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


namespace Application.Posts
{
    public class Create
    {
         public class Command: IRequest
         {
            public Guid Id {get; set;}
            public string Title {get;set;}
            public string Content { get; set; }
            //public string Author{get;set;}
            public IFormFile Image {get; set;}
            public string Stage{get; set;}
            //public string AuthorImage{get;set;}
            public string Type {get; set;}
         }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x=>x.Title).NotEmpty();
                //RuleFor(x=>x.Author).NotEmpty();
                RuleFor(x=>x.Stage).NotEmpty();
                //RuleFor(x=>x.AuthorImage).NotEmpty();
                RuleFor(x=>x.Type).NotEmpty();
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
                var post = new Post
                {
                    Id = request.Id,
                    Title = request.Title,
                    Content = request.Content,
                    //Author = request.Author,
                    PublishedDate = DateTime.Now,
                    Stage = request.Stage,
                    //AuthorImage = request.AuthorImage
                    Type = request.Type
                };
                
                String path = Directory.GetCurrentDirectory() + "Images\\postImages\\" + request.Stage;
                if(request.Image != null){
                    string fileName = request.Title + request.Image.FileName;
                    Directory.CreateDirectory(path);
                    path = Path.Combine(path, fileName);

                    using (var fs = new FileStream(path, FileMode.Create)){
                        await request.Image.CopyToAsync(fs);
                    }
                    post.imagePath = "Images/postImages/" + request.Stage + fileName;
                }

                


                _context.Posts.Add(post);
                var success = await _context.SaveChangesAsync() > 0 ;

                if(success) return Unit.Value;
                throw new Exception("Problem saving changes!");
            }
        }

    }
}