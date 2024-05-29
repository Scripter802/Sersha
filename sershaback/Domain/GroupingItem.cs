using System;

namespace Domain
{
    public class GroupingItem
    {
        public Guid Id { get; set; }
        public string Item { get; set; }
        public Guid GroupingQuestionId { get; set; }
        public virtual GroupingQuestion GroupingQuestion { get; set; }
    }
}
