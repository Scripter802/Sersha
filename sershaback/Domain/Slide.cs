using System;

namespace Domain
{
    public class Slide
    {
        public Guid Id { get; set; }
        public int Level { get; set; }
        public string Name { get; set; }
        public int Place { get; set; }
        public string FilePath { get; set; }
    }
}