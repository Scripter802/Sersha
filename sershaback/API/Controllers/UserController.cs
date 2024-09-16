using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.User;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    public class UserController:BaseController
    {
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<User>> Login(Login.Query query)
        {
            return await Mediator.Send(query);
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(Register.Command command)
        {
            return await Mediator.Send(command);
        }

        [AllowAnonymous]
        [HttpGet("list")]
        public async Task<ActionResult<List<User>>> List(CancellationToken ct)
        {
            var users = await Mediator.Send(new List.Query(), ct);
            return Ok(users);
        }

        /*[AllowAnonymous]
        [HttpGet("{email}")]public async Task<ActionResult<User>> Details(string email)
        {
            return await Mediator.Send(new Application.User.Details.Query { Email = email });
        }*/

        [AllowAnonymous]
        [HttpPost("create")]
        public async Task<ActionResult<User>> Create([FromBody] Create.Command command)
        {
            var user = await Mediator.Send(command);
            return Ok(user);
        }

        [AllowAnonymous]
        [HttpPut("{email}")]
        public async Task<ActionResult<Unit>> Edit(string email, Edit.Command command)
        {
            command.Email = email;
            return await Mediator.Send(command);
        }
        [AllowAnonymous]
        [HttpPut("add-to-klaviyo-subscibe-list")]
        public async Task<ActionResult<Unit>> AddToKlaviyoSubsribeList(AddToKlaviyoSubsribeList.Command command){
            return await Mediator.Send(command);
        }
        [AllowAnonymous]
        [HttpPut("subscribe/{email}")]
        public async Task<ActionResult<Unit>> Subscribe(string email, Subscribe.Command command){
            command.Email = email;
            return await Mediator.Send(command);
        }

        [AllowAnonymous]
        [HttpDelete("{email}")]
        public async Task<ActionResult<Unit>> Delete([FromRoute] string email) 
        {
            return await Mediator.Send(new Delete.Command { Email = email });
        }

        [HttpGet("current")]
        public async Task<ActionResult<User>> CurrentUser()
        {
            var user = await Mediator.Send(new CurrentUser.Query());
            return Ok(user);
        }

        [HttpGet("{email}")]
        public async Task<ActionResult<User>> Details(string email)
        {
            return await Mediator.Send(new Details.Query { Email = email });
        }
        
        [AllowAnonymous]
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            return Ok(new { message = "Logout successful" });
        }

        [AllowAnonymous]
        [HttpPost("reset-password-email")]
        public async Task<ActionResult<Unit>> ResetPasswordEmail(ResetPasswordEmail.Command command){
            return await Mediator.Send(command);
        }

        [AllowAnonymous]
        [HttpPost("reset-password")]
        public async Task<ActionResult<Unit>> ResetPassword(ResetPassword.Command command){
            return await Mediator.Send(command);
        }

    }
}