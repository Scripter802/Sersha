using System;
using static Domain.Enums;

namespace Application.Sersha
{
    public class SershaItemDTO
    {
        public Guid Id { get; set; }
        public string ImagePath { get; set; }
        public SershaItemType Type { get; set; }
        public SershaItemBodyPart BodyPart { get; set; }
        public string Name { get; set; }
    }
}