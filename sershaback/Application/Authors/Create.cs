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
            public string AuthorName{get;set;}
            public IFormFile AuthorImage{get;set;}
            public string AuthorImagePath {get;set;}
         }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x=>x.AuthorName).NotEmpty();
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
                    AuthorName = request.AuthorName,
                    AuthorImagePath = request.AuthorImagePath
                };
                
                String path = Directory.GetCurrentDirectory() + "\\Images\\authorImages\\" + request.Id;
                if(request.AuthorImage != null){
                    string fileName = request.AuthorName + request.AuthorImage.FileName;
                    Directory.CreateDirectory(path);
                    path = Path.Combine(path, fileName);

                    using (var fs = new FileStream(path, FileMode.Create)){
                        await request.AuthorImage.CopyToAsync(fs);
                    }
                    author.AuthorImagePath = "/Images/authorImages/" + request.Id + "/" + fileName;
                }

                _context.Authors.Add(author);
                var success = await _context.SaveChangesAsync() > 0 ;

                if(success) return Unit.Value;
                throw new Exception("Problem saving changes!");
            }
        }

    }
}