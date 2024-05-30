using System;
using System.Collections.Generic;

namespace Domain
{
    public class GroupingQuestion : Question
    {
         public ICollection<Group> Groups { get; set; } = new List<Group>();

    }
}
