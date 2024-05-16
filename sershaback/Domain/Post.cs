using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.VisualBasic;
using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain
{
    public class Post
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }
    public DateTime PublishedDate { get; set; }

    [NotMapped]
    public IFormFile Image { get; set; }
    public string ImagePath { get; set; }
    public string Stage { get; set; }
    public string Type { get; set; }

    public Guid AuthorId { get; set; }
    public Author Author { get; set; }
}
}
