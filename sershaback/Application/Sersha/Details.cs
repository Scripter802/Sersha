using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Sersha;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.SershaItems
{
    public class Details
    {
        public class Query : IRequest<SershaItemDTO>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, SershaItemDTO>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<SershaItemDTO> Handle(Query request, CancellationToken cancellationToken)
            {
                var sershaItem = await _context.SershaItems.FindAsync(request.Id);

                if (sershaItem == null)
                {
                    throw new Exception("SershaItem not found");
                }

                return _mapper.Map<SershaItem, SershaItemDTO>(sershaItem);
            }
        }
    }
}
