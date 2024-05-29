using System;
using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<Post> Posts { get; set; }
        public DbSet<Author> Authors { get; set; }
        public DbSet<AppUser> User { get; set; }
        public DbSet<Quiz> Quizzes { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Answer> Answer { get; set; }
        public DbSet<RightAnswerQuestion> RightAnswerQuestions { get; set; }
        public DbSet<CorrectIncorrectQuestion> CorrectIncorrectQuestions { get; set; }
        public DbSet<FillInTheBlankQuestion> FillInTheBlankQuestions { get; set; }
        public DbSet<GroupingQuestion> GroupingQuestions { get; set; }
        public DbSet<Answer> Answers { get; set; }
        public DbSet<GroupingItem> GroupingItems { get; set; } // Dodajte ovu liniju

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Post>()
                .HasOne(p => p.Author)
                .WithMany(a => a.Posts)
                .HasForeignKey(p => p.AuthorId);

            builder.Entity<Question>()
                .HasDiscriminator<string>("QuestionType")
                .HasValue<RightAnswerQuestion>("RightAnswer")
                .HasValue<CorrectIncorrectQuestion>("CorrectIncorrect")
                .HasValue<FillInTheBlankQuestion>("FillInTheBlank")
                .HasValue<GroupingQuestion>("Grouping");

            builder.Entity<GroupingQuestion>()
                .HasMany(g => g.GroupingItems)
                .WithOne(i => i.GroupingQuestion)
                .HasForeignKey(i => i.GroupingQuestionId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Question>()
                .HasMany(q => q.Answers)
                .WithOne(a => a.Question)
                .HasForeignKey(a => a.QuestionId)
                .OnDelete(DeleteBehavior.Cascade);      
                 
            builder.Entity<Quiz>()
                .Property(p => p.RowVersion).IsConcurrencyToken();
        }
    }
}
