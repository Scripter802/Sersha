using System;
using System.Collections.Generic;

namespace Domain
{
    public abstract class Question
    {
        public Guid Id { get; set; }
        public string Text { get; set; }
        public Guid QuizId { get; set; }
        public virtual Quiz Quiz { get; set; }
        public virtual ICollection<Answer> Answers { get; set; } = new List<Answer>();
    }

}
