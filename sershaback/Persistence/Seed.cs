using System;
using System.Collections.Generic;
using System.Data;
using System.Net.Mime;
using Domain;
using Microsoft.EntityFrameworkCore.Internal;
using System.ComponentModel.DataAnnotations;
using Microsoft.VisualBasic;
using System.Linq;

namespace Persistence
{
    public class Seed
    {
        
        public static void SeedData(DataContext context)
        {
            if(!context.Posts.Any()){
                var posts = new List<Post>
                {
                    new Post
                    {
                        Title = "Blog post 1",
                        Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin laoreet odio sed sapien pretium, vitae elementum nisl imperdiet. Cras sit amet viverra justo, vitae cursus lorem. Etiam vulputate, turpis bibendum molestie porttitor, tortor orci vulputate odio, in porttitor sapien nibh id sem. In id neque enim. ",
                        Author = "Jelena",
                        PublishedDate = DateTime.Now,
                        Image = "./"

                    },
                    new Post
                    {
                        Title = "Blog post 2",
                        Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin laoreet odio sed sapien pretium, vitae elementum nisl imperdiet. Cras sit amet viverra justo, vitae cursus lorem. Etiam vulputate, turpis bibendum molestie porttitor, tortor orci vulputate odio, in porttitor sapien nibh id sem. In id neque enim. ",
                        Author = "Milos",
                        PublishedDate = DateTime.Now,
                        Image = "./"

                    },
                     new Post
                    {
                        Title = "Blog post 4",
                        Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin laoreet odio sed sapien pretium, vitae elementum nisl imperdiet. Cras sit amet viverra justo, vitae cursus lorem. Etiam vulputate, turpis bibendum molestie porttitor, tortor orci vulputate odio, in porttitor sapien nibh id sem. In id neque enim. ",
                        Author = "Ana",
                        PublishedDate = DateTime.Now,
                        Image = "./"

                    }
                    
                };
                context.Posts.AddRange(posts);
                context.SaveChanges();
            }
        }
    }
}