using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Questions;
using Application.Quizzes;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static Domain.Enums;


namespace API.Controllers
{
    public class QuestionsController : BaseController
    {
        
    /*[HttpPost("{quizId}/questions")]
    public async Task<IActionResult> AddQuestion(Guid quizId, [FromBody] AddQuestion.Command command)
    {
        command.QuizId = quizId;
        await Mediator.Send(command);
        return Ok();
    }*/

    [AllowAnonymous]
    [HttpGet("questions/{id}")]
    public async Task<ActionResult<Question>> GetQuestion(Guid id)
    {
        var question = await Mediator.Send(new Application.Authors.Details.Query { Id = id });
        return Ok(question);
    }

    [AllowAnonymous]
    [HttpDelete("questions/{id}")]
    public async Task<IActionResult> DeleteQuestion(Guid id)
    {
        await Mediator.Send(new Application.Authors.Delete.Command { Id = id });
        return NoContent();
    }

  
    }
}
