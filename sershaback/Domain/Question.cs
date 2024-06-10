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
        #nullable enable
        public string? Text { get; set; }
        #nullable restore
        public ICollection<Answer> Answers { get; set; }
    }

}
