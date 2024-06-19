using System;
using System.Collections.Generic;

namespace Domain
{
    public class AvatarImage
    {
        public Guid Id { get; set; }
        public string ImagePath { get; set; }
        public string Name { get; set; }
        public ICollection<AppUser> Users { get; set; } = new List<AppUser>();
    }
}