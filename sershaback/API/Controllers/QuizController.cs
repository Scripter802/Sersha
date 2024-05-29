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
        public async Task<IActionResult> Create(Create.Command command)
        {
            await Mediator.Send(command);
            return Ok();
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
        public async Task<ActionResult<Unit>> Edit(Guid id, Edit.Command command)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }

        [AllowAnonymous]
        [HttpGet("random")]
        public async Task<ActionResult<Quiz>> Random()
        {
            return await Mediator.Send(new Application.Quizzes.RandomQuiz.Query());
        }
        
        [AllowAnonymous]
        [HttpGet("randomByType")]
        public async Task<ActionResult<Quiz>> RandomByType([FromQuery] QuizType type)
        {
            var quiz = await Mediator.Send(new Application.Quizzes.RandomByType.Query { Type = type });
            if (quiz == null)
            {
                return NotFound();
            }
            return Ok(quiz);
        }

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
        
        [AllowAnonymous]
        [HttpGet("RandomByAll")]
        public async Task<ActionResult<Question>> RandomByAll([FromQuery] Difficulty difficulty, [FromQuery] int numberOfQuestions)
        {
            return await Mediator.Send(new RandomByAll.Query { Difficulty = difficulty, NumberOfQuestions = numberOfQuestions });
        }

    }
}
