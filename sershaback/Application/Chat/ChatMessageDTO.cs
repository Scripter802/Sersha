using System;
using System.Collections.Generic;
using Application.Authors;

namespace Application.Chat
{
    public class ChatMessageDTO
    {
        public Guid Id { get; set; }
        public AuthorDto Sender { get; set; }
        public string Content { get; set; }
        public List<UserResponseDTO> Responses { get; set; }
        public bool IsHead { get; set; }
    }
}