using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Authors;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Persistence;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthorController: ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMediator _mediator;
        
        public AuthorController(IMediator mediator)
        {
             _mediator =  mediator;
            
        }


        [HttpGet]
        public async Task<ActionResult<List<Author>>> List(CancellationToken ct){
            return await _mediator.Send(new List.Query(), ct);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Author>> Details(Guid id){
            return await _mediator.Send(new Application.Authors.Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create([FromForm] Create.Command command)
        {
            /*if(!ModelState.IsValid)
                return BadRequest(ModelState);*/
            return await _mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit(Guid id, Edit.Command command)
        {
            command.Id = id;
            return await _mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            return await _mediator.Send(new Delete.Command{Id = id});
        }


    }

   

}