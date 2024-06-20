using System;

namespace Domain
{
    public class SershaItemsUserSelected
    {
        public Guid Id { get; set; }
        public string UserId { get; set; } 
        public AppUser User { get; set; }
        public Guid SershaItemId { get; set; }
        public SershaItem SershaItem { get; set; }
    }
}