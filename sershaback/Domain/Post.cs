using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.VisualBasic;
using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain
{
    public class Post
    {
        public Guid Id {get; set;}
        public string Title {get;set;}
        public string Content { get; set; }
        //public string Author{get;set;}
        public DateTime PublishedDate { get; set; }
        
        [NotMapped]
        public IFormFile Image {get; set;}
        public string imagePath {get;set;}
        public string Stage{get; set;}
        public string Type {get; set;}
        //public IFormFile AuthorImage{get;set;}
        //public string authorImagePath {get;set;}
    }
}
