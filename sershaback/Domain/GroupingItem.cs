using System;

namespace Domain
{
    public class GroupingItem
    {
        public Guid Id { get; set; }
        public string Item { get; set; }
        public Guid GroupId { get; set; }
        public Group Group { get; set; }
    }
}
