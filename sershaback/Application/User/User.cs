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
        public string UserBirthDate{get; set;}
        public string Type{get; set;}
        public string Token {get; set;}
        public string Image {get; set;}
    }
}