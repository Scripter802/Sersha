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

namespace Application.Authors
{
    public class Edit
    {
        public class Command: IRequest
        {
            public Guid Id {get; set;}
            public string authorName{get;set;}
            public IFormFile AuthorImage{get;set;}
            public string authorImagePath {get;set;}
            
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
                var author = await _context.Authors.FindAsync(request.Id);

                 if(author==null){
                    throw new RestException(HttpStatusCode.NotFound, new {author = "Not found"});
                }

                author.AuthorName = request.authorName ?? author.AuthorName;
                author.AuthorImage = request.AuthorImage ?? author.AuthorImage;
                
                
                String path = Directory.GetCurrentDirectory() + "\\wwwroot\\wwwroot\\Images\\authorImages\\" + request.Id;
                if(request.AuthorImage != null){
                    string fileName = request.authorName + request.AuthorImage.FileName;
                    Directory.CreateDirectory(path);
                    path = Path.Combine(path, fileName);

                    using (var fs = new FileStream(path, FileMode.Create)){
                        await request.AuthorImage.CopyToAsync(fs);
                    }
                    author.AuthorImagePath = "/Images/authorImages/" + request.Id + "/"+ fileName;
                }
                
                var success = await _context.SaveChangesAsync() > 0 ;

                if(success) return Unit.Value;
                throw new Exception("Problem saving changes!");
            }
        }
    }
}