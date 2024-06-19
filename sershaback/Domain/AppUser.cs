using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.CompilerServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;


namespace Domain
{
    /*public enum UserType
    {
        Admin,
        RegularUser
    }*/
    public class AppUser : IdentityUser
    {
        public string Password;
        public string FullName {get;set;}
        public string ParentsFullName {get;set;}
        [NotMapped]
        public IFormFile UserImage { get; set; }
        public string UserImagePath { get; set; }
        public int Level {get;set;}
        public int CoinBalance{get;set;}
        public string ParentPhoneNumber{get;set;}
        public DateTime UserBirthDate{get;set;}
        public string Type { get; set; }
        public AvatarImage AvatarImage { get; set; }
        public Guid? AvatarImageId { get; set; }
        public int Stage { get; set; }
    }
}