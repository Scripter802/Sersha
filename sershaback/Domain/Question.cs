using System;
using System.Collections.Generic;

namespace Domain
{
    public abstract class Question
    {
        public Guid Id { get; set; }
        public string Text { get; set; }
        public Guid QuizId { get; set; }
        public Quiz Quiz { get; set; }
    }

}
