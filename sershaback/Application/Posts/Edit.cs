using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using FluentValidation;
using MediatR;
using Persistence;
using Microsoft.AspNetCore.Http;
using System.IO;

namespace Application.Posts
{
    public class Edit
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
                /*RuleFor(x=>x.Title).NotEmpty();
                RuleFor(x=>x.Content).NotEmpty();
                //RuleFor(x=>x.Author).NotEmpty();
                //RuleFor(x=>x.PublishedDate).NotEmpty();
                RuleFor(x=>x.Image).NotEmpty();
                RuleFor(x=>x.Stage).NotEmpty();
                //RuleFor(x=>x.AuthorImage).NotEmpty();*/
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
                //handler logic 
                var post = await _context.Posts.FindAsync(request.Id);

                 if(post==null){
                    throw new RestException(HttpStatusCode.NotFound, new {post = "Not found"});
                }

                post.Title = request.Title ?? post.Title;
                post.Content = request.Content ?? post.Content;
                //post.Author = request.Author ?? post.Author;
            
                post.Stage = request.Stage ?? post.Stage;
                //post.AuthorImage = request.AuthorImage ?? post.AuthorImage;
                post.Type= request.Type ?? post.Type;
                
                String path = Directory.GetCurrentDirectory() + "Images\\postImages\\" + request.Stage;
                if(request.Image != null){
                    string fileName = request.Title + request.Image.FileName;
                    Directory.CreateDirectory(path);
                    path = Path.Combine(path, fileName);

                    using (var fs = new FileStream(path, FileMode.Create)){
                        await request.Image.CopyToAsync(fs);
                    }
                    post.ImagePath = "Images/postImages/" + request.Stage + fileName;
                }
                
                var success = await _context.SaveChangesAsync() > 0 ;

                if(success) return Unit.Value;
                throw new Exception("Problem saving changes!");
            }
        }
    }
}