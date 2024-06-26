using System;

namespace Application.Chat
{
    public class UserResponseDTO
    {
        public Guid Id { get; set; }
        public string Content { get; set; }
        public Guid? NextMessageId { get; set; }
    }
}