using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Posts;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Persistence;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PostController: ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMediator _mediator;
        
        public PostController(IMediator mediator)
        {
             _mediator =  mediator;
            
        }


        [HttpGet]
        public async Task<ActionResult<List<Post>>> List(CancellationToken ct){
            return await _mediator.Send(new List.Query(), ct);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Post>> Details(Guid id){
            return await _mediator.Send(new Application.Posts.Details.Query{Id = id});
        }

        [HttpGet("ListPerStages/{stage}")]
        public async Task<ActionResult<List<Post>>> ListPerStage(string stage){
            return await _mediator.Send(new Application.Posts.ListPerStage.Query{Stage = stage});
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