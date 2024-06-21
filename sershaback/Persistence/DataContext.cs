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
        public DbSet<RightAnswerQuestion> RightAnswerQuestions { get; set; }
        public DbSet<CorrectIncorrectQuestion> CorrectIncorrectQuestions { get; set; }
        public DbSet<FillInTheBlankQuestion> FillInTheBlankQuestions { get; set; }
        public DbSet<GroupingQuestion> GroupingQuestions { get; set; }
        public DbSet<SnapJudgementQuestion> SnapJudgementQuestions { get; set; }
        public DbSet<EmojiEmotionsQuestion> EmojiEmotionsQuestions { get; set; }
        public DbSet<FriendOrFoeQuestion> FriendOrFoeQuestions { get; set; }
        public DbSet<PostingChallengeQuestion> PostingChallengeQuestions { get; set; }
        public DbSet<Answer> Answers { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<GroupingItem> GroupingItems { get; set; }
        public DbSet<AvatarImage> AvatarImages { get; set; }

        public DbSet<SershaItem> SershaItems { get; set; }
        public DbSet<SershaItemsUserOwns> SershaItemsUserOwns { get; set; }
        public DbSet<SershaItemsUserSelected> SershaItemsUserSelected { get; set; }
        public DbSet<ChatMessage> ChatMessages { get; set; }
        public DbSet<UserResponse> UserResponses { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Post>()
                .HasOne(p => p.Author)
                .WithMany(a => a.Posts)
                .HasForeignKey(p => p.AuthorId)
                .OnDelete(DeleteBehavior.Cascade);   

            
             builder.Entity<Quiz>()
                .HasMany(q => q.Questions)
                .WithOne(q => q.Quiz)
                .HasForeignKey(q => q.QuizId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Question>()
                .HasDiscriminator<string>("QuestionType")
                .HasValue<RightAnswerQuestion>("RightAnswer")
                .HasValue<CorrectIncorrectQuestion>("CorrectIncorrect")
                .HasValue<FillInTheBlankQuestion>("FillInTheBlank")
                .HasValue<GroupingQuestion>("Grouping")
                .HasValue<SnapJudgementQuestion>("SnapJudgement")
                .HasValue<EmojiEmotionsQuestion>("EmojiEmotions")
                .HasValue<FriendOrFoeQuestion>("FriendOrFoe")
                .HasValue<PostingChallengeQuestion>("PostingChallenge");

            builder.Entity<Question>()
                .HasMany(q => q.Answers)
                .WithOne(a => a.Question)
                .HasForeignKey(a => a.QuestionId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<GroupingQuestion>()
                .HasMany(g => g.Groups)
                .WithOne(g => g.GroupingQuestion)
                .HasForeignKey(g => g.GroupingQuestionId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Group>()
                .HasMany(g => g.GroupingItems)
                .WithOne(gi => gi.Group)
                .HasForeignKey(gi => gi.GroupId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<AppUser>()
                .HasOne(u => u.AvatarImage)
                .WithMany(a => a.Users)
                .HasForeignKey(u => u.AvatarImageId)
                .OnDelete(DeleteBehavior.SetNull);

            builder.Entity<SershaItemsUserOwns>()
                .HasOne(u => u.User)
                .WithMany(o => o.OwnedSershaItems)
                .HasForeignKey(u => u.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<SershaItemsUserOwns>()
                .HasOne(si => si.SershaItem)
                .WithMany()
                .HasForeignKey(si => si.SershaItemId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<SershaItemsUserSelected>()
                .HasOne(u => u.User)
                .WithMany(s => s.SelectedSershaItems)
                .HasForeignKey(u => u.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<SershaItemsUserSelected>()
                .HasOne(si => si.SershaItem)
                .WithMany()
                .HasForeignKey(si => si.SershaItemId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<ChatMessage>()
                .HasMany(cm => cm.Responses)
                .WithOne(r => r.ChatMessage)
                .HasForeignKey(r => r.ChatMessageId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<UserResponse>()
                .HasOne(r => r.NextMessage)
                .WithMany()
                .HasForeignKey(r => r.NextMessageId)
                .OnDelete(DeleteBehavior.Restrict);

        }
    }
}
