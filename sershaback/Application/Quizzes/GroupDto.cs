using System.Collections.Generic;


namespace Application.Quizzes
{
    public class GroupDto
    {
        public string GroupName { get; set; }
        public List<GroupingItemDto> Items { get; set; }
    }

}