using System;
using System.Collections.Generic;
using System.Data;
using System.Net.Mime;
using Domain;
using Microsoft.EntityFrameworkCore.Internal;
using System.ComponentModel.DataAnnotations;
using Microsoft.VisualBasic;
using System.Linq;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;

namespace Persistence
{
    public class Seed
    {
        
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {

            if(!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        UserEmail = "UserEmail@email.com",
                        Pass = "",
                        FullName = "Pera Peric",
                        ParentsFullName = "",
                        UserImage = null,
                        UserImagePath  = null,
                        Level = 10,
                        CoinBalance = 50,
                        ParentPhoneNumber = "+381 66 123456",
                        UserBirthDate = new DateTime(2004, 1, 1),
                        Type = "User"

                    },
                    new AppUser
                    {
                        UserEmail = "email2@email.com",
                        Pass = "",
                        FullName = "Pera Peric",
                        ParentsFullName = "",
                        UserImage = null,
                        UserImagePath  = null,
                        Level = 10,
                        CoinBalance = 50,
                        ParentPhoneNumber = "+381 66 123456",
                        UserBirthDate = new DateTime(2005, 3, 1),
                        Type = "User"

                    }
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
                context.Users.AddRange(users);
                context.SaveChanges();
            }

            /*if(!context.Posts.Any()){
                var posts = new List<Post>
                {
                    new Post
                    {
                        Title = "Blog post 1",
                        Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin laoreet odio sed sapien pretium, vitae elementum nisl imperdiet. Cras sit amet viverra justo, vitae cursus lorem. Etiam vulputate, turpis bibendum molestie porttitor, tortor orci vulputate odio, in porttitor sapien nibh id sem. In id neque enim. ",
                        //Author = "Jelena",
                        PublishedDate = DateTime.Now,
                        //Image = "./"

                    },
                    new Post
                    {
                        Title = "Blog post 2",
                        Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin laoreet odio sed sapien pretium, vitae elementum nisl imperdiet. Cras sit amet viverra justo, vitae cursus lorem. Etiam vulputate, turpis bibendum molestie porttitor, tortor orci vulputate odio, in porttitor sapien nibh id sem. In id neque enim. ",
                        //Author = "Milos",
                        PublishedDate = DateTime.Now,
                        //Image = "./"

                    },
                     new Post
                    {
                        Title = "Blog post 4",
                        Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin laoreet odio sed sapien pretium, vitae elementum nisl imperdiet. Cras sit amet viverra justo, vitae cursus lorem. Etiam vulputate, turpis bibendum molestie porttitor, tortor orci vulputate odio, in porttitor sapien nibh id sem. In id neque enim. ",
                        //Author = "Ana",
                        PublishedDate = DateTime.Now,
                        //Image = "./"

                    }
                    
                };
                context.Posts.AddRange(posts);
                context.SaveChanges();
            }*/
            
        }
    }
}