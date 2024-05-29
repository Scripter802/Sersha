using System;
using System.Collections.Generic;

namespace Domain
{
    public class GroupingQuestion : Question
    {
        public string GroupName { get; set; }
        public virtual ICollection<GroupingItem> GroupingItems { get; set; } = new List<GroupingItem>();
    }
}
