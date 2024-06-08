using System.Collections.Generic;
using static Domain.Enums;
using Domain;
using Application.Quizzes;


namespace Application.Quizzes
{
    public class QuestionDto
    {
        public string QuestionText { get; set; }
        public bool IsCorrect { get; set; }
        public List<AnswerDto> Answers { get; set; }
        public string Statement1 { get; set; }
        public string Statement2 { get; set; }        
        public List<GroupDto> Groups { get; set; }

    }

   

}