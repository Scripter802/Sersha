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

    [AllowAnonymous]
    [HttpDelete("{quizId}/questions/{questionId}")]
    public async Task<IActionResult> DeleteQuestion(Guid quizId, Guid questionId)
    {
        var result = await Mediator.Send(new DeleteQuestion.Command { QuizId = quizId, QuestionId = questionId });
        if (!result)
        {
            return NotFound("Question not found");
        }
        return NoContent(); 
    }

    [AllowAnonymous]
    [HttpPut("{quizId}/questions/{questionId}")]
    public async Task<IActionResult> EditQuestion(Guid quizId, Guid questionId, [FromForm] EditQuestion.Command command)
    {
        if (quizId != command.QuizId || questionId != command.QuestionId)
        {
            return BadRequest("Mismatched Quiz ID or Question ID");
        }

        var result = await Mediator.Send(command);
        if (!result)
        {
            return NotFound("Question not found or error in updating");
        }
        return NoContent();
    }

  
    }
}
