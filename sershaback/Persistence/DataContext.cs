using System;
using Domain;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        } 

        public DbSet<Post> Posts{get; set;}
        public DbSet<Author> Authors { get; set; }

        public override Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry<TEntity> Remove<TEntity>(TEntity entity) where TEntity : class
        {
            return base.Remove(entity);
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Post>()
                .HasOne(p => p.Author)
                .WithMany(a => a.Posts)
                .HasForeignKey(p => p.AuthorId);
        }
        
    }

}
