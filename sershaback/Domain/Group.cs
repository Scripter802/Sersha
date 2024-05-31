using System;
using System.Collections.Generic;

namespace Domain
{
    public class Group
{
    public Guid Id { get; set; }
    public string Name { get; set; }
     public Guid GroupingQuestionId { get; set; }
    public GroupingQuestion GroupingQuestion { get; set; }
    public ICollection<GroupingItem> GroupingItems { get; set; } = new List<GroupingItem>();

}

}