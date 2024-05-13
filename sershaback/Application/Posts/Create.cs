using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Posts
{
    public class Create
    {
         public class Command: IRequest
         {
            public Guid Id {get; set;}
            public string Title {get;set;}
            public string Content { get; set; }
            public string Author{get;set;}
            public DateTime PublishedDate { get; set; }
            public string Image {get; set;}
            public string Stage{get; set;}
             public string AuthorImage{get;set;}
         }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x=>x.Title).NotEmpty();
                RuleFor(x=>x.Content).NotEmpty();
                RuleFor(x=>x.Author).NotEmpty();
                RuleFor(x=>x.PublishedDate).NotEmpty();
                RuleFor(x=>x.Image).NotEmpty();
                RuleFor(x=>x.Stage).NotEmpty();
                RuleFor(x=>x.AuthorImage).NotEmpty();
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
                    Author = request.Author,
                    PublishedDate = request.PublishedDate,
                    Image = request.Image,
                    Stage = request.Stage,
                    AuthorImage = request.AuthorImage
                };

                _context.Posts.Add(post);
                var success = await _context.SaveChangesAsync() > 0 ;

                if(success) return Unit.Value;
                throw new Exception("Problem saving changes!");
            }
        }

    }
}