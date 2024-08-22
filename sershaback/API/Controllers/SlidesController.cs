using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Application.Slides;
using Domain;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class SlidesController : BaseController
    {
        [HttpPost]
        public async Task<ActionResult<Guid>> Create([FromForm] Create.Command command)
        {
            var result = await Mediator.Send(command);
            return Ok(result); 
        }

        [HttpGet]
        public async Task<ActionResult<List<Slide>>> List()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(Guid id, [FromForm] Edit.Command command)
        {
            if (id != command.Id)
            {
                return BadRequest("ID in the URL and the body are not same");
            }

            await Mediator.Send(command);
            return NoContent(); 
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var result = await Mediator.Send(new Delete.Command { Id = id });
            if (!result) {
                return NotFound();
            }
            return NoContent(); 
        }

        [HttpGet("level/{level}")]
        public async Task<ActionResult<List<Slide>>> ListPerLevel(int level)
        {
            return await Mediator.Send(new ListPerLevel.Query { Level = level });
        }
        
    }
}
