using System.Collections.Generic;

namespace Domain
{
    public class RightAnswerQuestion : Question
    {
       public ICollection<Answer> Answers { get; set; } = new List<Answer>();
    }
}
