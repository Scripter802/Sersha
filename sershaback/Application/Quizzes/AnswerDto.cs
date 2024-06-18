using Microsoft.AspNetCore.Http;

namespace Application.Quizzes
{
    public class AnswerDto
    {
        public string Text { get; set; }
        public bool IsCorrect { get; set; }
        public IFormFile ImageFile { get; set; }
    }
}