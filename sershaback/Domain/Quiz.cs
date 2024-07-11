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
        public List<Question> Questions { get; set; } = new List<Question>();
        public string QuizName {get;set;}
        public string ConversationStarter {get;set;}

        /*[Timestamp]
        public byte[] RowVersion { get; set; }*/
    }
}
