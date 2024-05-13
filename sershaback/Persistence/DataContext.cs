using System;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        } 

        public DbSet<Post> Posts{get; set;}

        public override Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry<TEntity> Remove<TEntity>(TEntity entity) where TEntity : class
        {
            return base.Remove(entity);
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            
        }
        
    }

}
