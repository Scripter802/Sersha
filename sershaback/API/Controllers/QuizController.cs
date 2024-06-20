using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Quizzes;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static Domain.Enums;


namespace API.Controllers
{
    public class QuizzesController : BaseController
    {
        [AllowAnonymous]
        [HttpPost("create")]
        public async Task<IActionResult>  Create([FromForm] Create.Command command)
        {
            var result = await Mediator.Send(command);
            return Ok(result);
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<List<Quiz>>> List()
        {
            var quizzes = await Mediator.Send(new List.Query());
            return Ok(quizzes);
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<Quiz>> Details(Guid id)
        {
            var result = await Mediator.Send(new Details.Query { Id = id });
            return Ok(result);
        }

        [AllowAnonymous]
        [HttpGet("randomByDifficulty/{difficulty}")]
        public async Task<ActionResult<Quiz>> RandomByDifficulty(Difficulty difficulty)
        {
            var result = await Mediator.Send(new RandomByDifficulty.Query { Difficulty = difficulty });
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [AllowAnonymous]
        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(Guid id, [FromBody] Edit.Command command)
        {
            if (id != command.Id)
            {
                return BadRequest("Id in URL does not match Id in command");
            }

            await Mediator.Send(command);
            return NoContent();
        }

        [AllowAnonymous]
        [HttpGet("random")]
        public async Task<ActionResult<Quiz>> Random()
        {
            return await Mediator.Send(new Application.Quizzes.RandomQuiz.Query());
        }
        
        /*[AllowAnonymous]
        [HttpGet("randomByType/{type}")]
        public async Task<ActionResult<Quiz>> RandomByType(QuizType type)
        {
            var quiz = await Mediator.Send(new Application.Quizzes.RandomByType.Query { Type = type });
            if (quiz == null)
            {
                return NotFound();
            }
            return Ok(quiz);
        }*/

        [AllowAnonymous]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var result = await Mediator.Send(new Delete.Command { Id = id });
            if (!result)
            {
                return NotFound();
            }
            return Ok();
        }

        /*[AllowAnonymous]
        [HttpGet("RandomByAll/{difficulty}/{type}")]
        public async Task<ActionResult<Quiz>> RandomByAll(Difficulty difficulty, QuizType type)
        {
            return await Mediator.Send(new RandomByAll.Query { Difficulty = difficulty, Type = type });
        }*/

        /*[AllowAnonymous]
        [HttpGet("ListQuestionsByType/{type}")]
        public async Task<ActionResult<List<Question>>> ListQuestionsByType(QuizType type)
        {
            return await Mediator.Send(new ListQuestionsByType.Query{ Type = type});
        }*/

        [AllowAnonymous]
        [HttpGet("ListMinigameQuestionsByTypeAndDifficulty/{difficulty}/{type}")]
        public async Task<ActionResult<List<Question>>> ListMinigameQuestionsByTypeAndDifficulty(Difficulty difficulty, QuestionType type)
        {
            return await Mediator.Send(new ListMinigameQuestionsByTypeAndDifficulty.Query{ Difficulty = difficulty, Type = type});
        }

    }
}
