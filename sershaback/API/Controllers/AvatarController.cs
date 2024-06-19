using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Application.Avatar;
using Domain;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class AvatarController : BaseController
    {
        [HttpPost]
        public async Task<ActionResult<Guid>> Create([FromForm] Create.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpGet]
        public async Task<ActionResult<List<AvatarImageDTO>>> List()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AvatarImageDTO>> Details(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(Guid id, [FromForm] Edit.Command command)
        {
            if (id != command.Id)
            {
                return BadRequest("Mismatched ID in the URL and the body");
            }

            await Mediator.Send(command);
            return NoContent(); // HTTP 204 ako je uspešno, bez sadržaja
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await Mediator.Send(new Delete.Command { Id = id });
            return NoContent(); // HTTP 204 ako je uspešno, bez sadržaja
        }
    }
}
