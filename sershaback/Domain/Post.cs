using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.VisualBasic;
using Microsoft.AspNetCore.Http;

namespace Domain
{
    public class Post
    {
        public Guid Id {get; set;}
        public string Title {get;set;}
        public string Content { get; set; }
        //public string Author{get;set;}
        public DateTime PublishedDate { get; set; }
        public IFormFile Image {get; set;}
        public string imagePath {get;set;}
        public string Stage{get; set;}
        //public IFormFile AuthorImage{get;set;}
        //public string authorImagePath {get;set;}
    }
}
