using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Sersha;
using Application.SershaItems;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SershaItemController : BaseController
    {
        [AllowAnonymous]
        [HttpPost("create")]
        public async Task<IActionResult> Create([FromForm] Create.Command command)
        {
            var result = await Mediator.Send(command);
            return Ok(result);
        }

        [AllowAnonymous]
        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(Guid id, [FromForm] Edit.Command command)
        {
            command.Id = id;
            await Mediator.Send(command);
            return NoContent();
        }

        [AllowAnonymous]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await Mediator.Send(new Delete.Command { Id = id });
            return NoContent();
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<List<SershaItemDTO>>> List()
        {
            var result = await Mediator.Send(new List.Query());
            return Ok(result);
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<SershaItemDTO>> Details(Guid id)
        {
            var result = await Mediator.Send(new Details.Query { Id = id });
            return Ok(result);
        }
    }
}
