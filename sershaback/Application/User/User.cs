using System;
using Application.Avatar;
using Microsoft.AspNetCore.Identity;

namespace Application.User
{
    public class User
    {
        public string FullName {get; set;}
        public string ParentsFullName{get; set;}
        public int Level{get; set;}
        public int CoinBalance{get;set;}
        public string ParentPhoneNumber{get; set;}
        public DateTime UserBirthDate{get; set;}
        public string Type{get; set;}
        public string Token {get; set;}
        public string Image {get; set;}
        public string Email { get; internal set; }
        public string Password { get; internal set; }
        public int Stage { get; set; }
        public AvatarImageDTO AvatarImage { get; set; } 
        public bool isFirstTimeLoggedIn { get; set; }
    }
}