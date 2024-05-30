using System.Collections.Generic;

namespace Domain
{
    public class FillInTheBlankQuestion : Question
    {
        public string Statement1 { get; set; }
        public string Statement2 { get; set; }
        public ICollection<Answer> Answers { get; set; } = new List<Answer>();
    }
}
