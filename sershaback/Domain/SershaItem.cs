using System;
using static Domain.Enums;

namespace Domain
{
     public class SershaItem
    {
        public Guid Id { get; set; }
        public string ImagePath { get; set; }
        public SershaItemType Type { get; set; }
        public SershaItemBodyPart BodyPart { get; set; }
        public string Name { get; set; }
    }
}