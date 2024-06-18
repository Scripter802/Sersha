using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using static Domain.Enums;

namespace Domain
{
    public abstract class Question
    {
        public Guid Id { get; set; }
        public string Text { get; set; } // ?
        public string ImagePath { get; set; } // ?
        public Guid QuizId { get; set; }
        public Quiz Quiz { get; set; }
        public List<Answer> Answers { get; set; } = new List<Answer>();
        public QuestionType Type { get; set; }
    }

}
