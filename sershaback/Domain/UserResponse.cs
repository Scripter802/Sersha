using System;

namespace Domain
{
    public class UserResponse
    {
        public Guid Id { get; set; }
        public string Content { get; set; }
        public Guid ChatMessageId { get; set; }
        public ChatMessage ChatMessage { get; set; }
        public Guid? NextMessageId { get; set; }
        public ChatMessage NextMessage { get; set; }
    }
}