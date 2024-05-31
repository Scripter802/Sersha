using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using static Domain.Enums;

namespace Domain
{
    public class Quiz
    {
        public Guid Id { get; set; }
        public Difficulty Difficulty { get; set; }
        public QuizType Type { get; set; }
        public ICollection<Question> Questions { get; set; }

        /*[Timestamp]
        public byte[] RowVersion { get; set; }*/
    }
}
