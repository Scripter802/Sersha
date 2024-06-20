using System.Collections.Generic;
using System.Linq;
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
    public class List
    {
        public class Query : IRequest<List<SershaItemDTO>> { }

        public class Handler : IRequestHandler<Query, List<SershaItemDTO>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<List<SershaItemDTO>> Handle(Query request, CancellationToken cancellationToken)
            {
                var sershaItems = await _context.SershaItems.ToListAsync();

                return _mapper.Map<List<SershaItem>, List<SershaItemDTO>>(sershaItems);
            }
        }
    }
}
