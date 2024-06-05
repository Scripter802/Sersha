using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Posts;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Persistence;

namespace API.Controllers
{
   
    public class PostController: BaseController
    {
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<List<PostDto>>> List(CancellationToken ct){
            return await Mediator.Send(new List.Query(), ct);
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        //[Authorize]
        public async Task<ActionResult<PostDto>> Details(Guid id){
            return await Mediator.Send(new Application.Posts.Details.Query{Id = id});
        }

        [AllowAnonymous]
        [HttpGet("ListPerStages/{stage}")]
        public async Task<ActionResult<List<PostDto>>> ListPerStage(string stage){
            return await Mediator.Send(new Application.Posts.ListPerStage.Query{Stage = stage});
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult<Unit>> Create([FromForm] Create.Command command)
        {
            /*if(!ModelState.IsValid)
                return BadRequest(ModelState);*/
            return await Mediator.Send(command);
        }

        [AllowAnonymous]
        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit([FromForm] Guid id, Edit.Command command)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }

        [AllowAnonymous]
        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            return await Mediator.Send(new Delete.Command{Id = id});
        }


    }

   

}