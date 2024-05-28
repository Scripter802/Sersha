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
                        Email = "jelena@gmail.com",
                        NormalizedEmail = "jelena@gmail.com".ToUpperInvariant(),
                        FullName = "Jelena Lukic",
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
                        Email = "email2@email.com",
                        NormalizedEmail = "email2@email.com".ToUpperInvariant(),
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

            
            
        }
    }
}