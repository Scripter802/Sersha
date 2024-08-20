using System.Collections.Generic;


namespace Application.Quizzes
{
    public class GroupDto
    {
        public string Name { get; set; }
        public List<GroupingItemDto> GroupingItems { get; set; }
    }

}