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


namespace Application.Authors
{
    public class Create
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
                RuleFor(x=>x.authorName).NotEmpty();
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
                var author = new Author
                {
                    Id = request.Id,
                    AuthorName = request.authorName,
                    AuthorImagePath = request.authorImagePath
                };
                
                String path = Directory.GetCurrentDirectory() + "Images\\authorImages\\" + request.Id;
                if(request.AuthorImage != null){
                    string fileName = request.authorName + request.AuthorImage.FileName;
                    Directory.CreateDirectory(path);
                    path = Path.Combine(path, fileName);

                    using (var fs = new FileStream(path, FileMode.Create)){
                        await request.AuthorImage.CopyToAsync(fs);
                    }
                    author.AuthorImagePath = "Images/postImages/" + request.Id + fileName;
                }

                _context.Authors.Add(author);
                var success = await _context.SaveChangesAsync() > 0 ;

                if(success) return Unit.Value;
                throw new Exception("Problem saving changes!");
            }
        }

    }
}