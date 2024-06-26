using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;

namespace Domain
{
    public class Author
    {
        public Guid Id { get; set; }
        public string AuthorName { get; set; }

        [NotMapped]
        public IFormFile AuthorImage { get; set; }
        public string AuthorImagePath { get; set; }
        public ICollection<Post> Posts { get; set; }
        public ICollection<ChatMessage> Messages { get; set; } = new List<ChatMessage>();
    }
}