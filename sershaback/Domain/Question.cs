using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public abstract class Question
    {
        public Guid Id { get; set; }
        public Guid QuizId { get; set; }
        public Quiz Quiz { get; set; }
        
        /*[Required(ErrorMessage = "'Question text must not be empty.")]*/
        public string Text { get; set; }
        public ICollection<Answer> Answers { get; set; }
    }

}
