using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.VisualBasic;

namespace Domain
{
    public class Post
    {
        public Guid Id {get; set;}
        public string Title {get;set;}
        public string Content { get; set; }
        public string Author{get;set;}
        public DateTime PublishedDate { get; set; }
        public string Image {get; set;}
        public string Stage{get; set;}
        public string AuthorImage{get;set;}

    }
}
