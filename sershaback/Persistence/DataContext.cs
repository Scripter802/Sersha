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
        public DbSet<GroupingItem> GroupingItems { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Post>()
                .HasOne(p => p.Author)
                .WithMany(a => a.Posts)
                .HasForeignKey(p => p.AuthorId)
                .OnDelete(DeleteBehavior.Cascade);   

            
            builder.Entity<Question>()
                .HasDiscriminator<int>("QuestionType")
                .HasValue<RightAnswerQuestion>(0)
                .HasValue<CorrectIncorrectQuestion>(1)
                .HasValue<FillInTheBlankQuestion>(2)
                .HasValue<GroupingQuestion>(3);

            
            builder.Entity<Quiz>()
                .HasMany(q => q.Questions)
                .WithOne(q => q.Quiz)
                .HasForeignKey(q => q.QuizId);

           
            builder.Entity<RightAnswerQuestion>()
                .HasMany(q => q.Answers)
                .WithOne(a => (RightAnswerQuestion)a.Question)
                .HasForeignKey(a => a.QuestionId)
                .OnDelete(DeleteBehavior.Cascade);

            
            builder.Entity<FillInTheBlankQuestion>()
                .HasMany(q => q.Answers)
                .WithOne(a => (FillInTheBlankQuestion)a.Question)
                .HasForeignKey(a => a.QuestionId)
                .OnDelete(DeleteBehavior.Cascade);

           
            builder.Entity<GroupingQuestion>()
                .HasMany(q => q.Groups)
                .WithOne(g => (GroupingQuestion)g.GroupingQuestion)
                .HasForeignKey(g => g.GroupingQuestionId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Group>()
                .HasMany(g => g.GroupingItems)
                .WithOne(gi => gi.Group)
                .HasForeignKey(gi => gi.GroupId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
