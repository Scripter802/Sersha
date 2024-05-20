using System;
using System.Collections.Generic;
using Domain;

namespace Application.Authors
{
    public class AuthorDto
    {
        public Guid Id { get; set; }
        public string AuthorName { get; set; }

        public string AuthorImagePath { get; set; }
        //public ICollection<Post> Posts { get; set; }
    }
}