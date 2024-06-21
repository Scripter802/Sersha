using System;
using System.Collections.Generic;

namespace Domain
{
    public class ChatMessage
    {
        public Guid Id { get; set; }
        public string Sender { get; set; }
        public string Content { get; set; }
        public List<UserResponse> Responses { get; set; }= new List<UserResponse>();
    }
}