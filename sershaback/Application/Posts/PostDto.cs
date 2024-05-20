using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Application.Authors;
using Domain;
using Microsoft.AspNetCore.Http;

namespace Application.Posts
{
    public class PostDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime PublishedDate { get; set; }
        public string ImagePath { get; set; }
        public string Stage { get; set; }
        public string Type { get; set; }

        public Guid AuthorId { get; set; }
        public AuthorDto Author { get; set; }

    }
}