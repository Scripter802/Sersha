using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Application.Chats;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Domain;
using System.Collections.Generic;
using Application.Chat;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : BaseController
    {
        [HttpPost("createChat")]
        [AllowAnonymous]
        public async Task<ActionResult<Unit>> CreateChatMessage(CreateChatMessage.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpGet("{messageId}")]
        [AllowAnonymous]
        public async Task<ActionResult<ChatMessageDTO>> GetChatMessage(Guid messageId)
        {
            return await Mediator.Send(new GetChatMessage.Query { MessageId = messageId });
        }

        [HttpGet("randomChatMessage")]
        [AllowAnonymous]
        public async Task<ActionResult<ChatMessageDTO>> GetRandomChatMessage()
        {
            return await Mediator.Send(new GetRandomChatMessage.Query());
        }

        [HttpPost("createResponse")]
        [AllowAnonymous]
        public async Task<ActionResult<Unit>> CreateUserResponse(CreateUserResponse.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<Unit>> EditChatMessage(Guid id, EditChatMessage.Command command)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<Unit>> DeleteChatMessage(Guid id)
        {
            return await Mediator.Send(new DeleteChatMessage.Command { Id = id });
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<List<ChatMessageDTO>>> ListChatMessages()
        {
            return await Mediator.Send(new ListChatMessages.Query());
        }
    }
}
