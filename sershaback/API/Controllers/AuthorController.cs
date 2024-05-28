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
   
    public class AuthorController: BaseController
    {
        
        [HttpGet]
        public async Task<ActionResult<List<Author>>> List(CancellationToken ct){
            return await Mediator.Send(new List.Query(), ct);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Author>> Details(Guid id){
            return await Mediator.Send(new Application.Authors.Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create([FromForm] Create.Command command)
        {
            /*if(!ModelState.IsValid)
                return BadRequest(ModelState);*/
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit([FromForm] Guid id, Edit.Command command)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            return await Mediator.Send(new Delete.Command{Id = id});
        }


    }

   

}