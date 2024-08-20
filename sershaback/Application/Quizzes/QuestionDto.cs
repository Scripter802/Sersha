using System.Collections.Generic;
using static Domain.Enums;
using Domain;
using Application.Quizzes;
using Microsoft.AspNetCore.Http;
using System;

namespace Application.Quizzes
{
    public class QuestionDto
    {
        public Guid Id { get; set; } 
        public QuestionType Type { get; set; }
        #nullable enable
        public string? Text { get; set; }
        public IFormFile? ImageFile { get; set; } 
        public string? ImagePath { get; set; } 
        public string? Content { get; set; } 
        #nullable restore
        public bool IsCorrect { get; set; }
        public List<AnswerDto> Answers { get; set; }
        public string Statement1 { get; set; }
        public string Statement2 { get; set; }        
        public List<GroupDto> Groups { get; set; }
    }
}
