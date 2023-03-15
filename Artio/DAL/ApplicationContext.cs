using Core.Entitites;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class ApplicationContext : IdentityDbContext<User>
    {
        public DbSet<Comment> Comments { get; set; }

        public DbSet<Like> Likes { get; set; }

        public DbSet<Photo> Photos { get; set; }

        public DbSet<Post> Posts { get; set; }

        public DbSet<PostTag> PostTags { get; set; }

        public DbSet<Tag> Tags { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<UserFollowing> UserFollowings { get; set; }

        public DbSet<UserTag> UserTags { get; set; }

        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Comment>(b =>
            {
                b.HasOne(u => u.User)
                    .WithMany(c => c.Comments)
                    .HasForeignKey(b => b.UserId);

                b.HasOne(p => p.Post)
                    .WithMany(c => c.Comments)
                    .HasForeignKey(b => b.PostId);
            });

            builder.Entity<Like>(b =>
            {
                b.HasKey(k => new { k.UserId, k.PostId });

                b.HasOne(u => u.User)
                    .WithMany(l => l.Likes)
                    .HasForeignKey(b => b.UserId);

                b.HasOne(p => p.Post)
                    .WithMany(l => l.Likes)
                    .HasForeignKey(b => b.PostId);
            });

            builder.Entity<Post>(b =>
            {
                b.HasOne(u => u.User)
                    .WithMany(p => p.Posts)
                    .HasForeignKey(b => b.UserId);
            });

            builder.Entity<PostTag>(b =>
            {
                b.HasKey(k => new { k.PostId, k.TagId });

                b.HasOne(t => t.Tag)
                    .WithMany(p => p.PostTags)
                    .HasForeignKey(b => b.TagId);

                b.HasOne(p => p.Post)
                    .WithMany(l => l.PostTags)
                    .HasForeignKey(b => b.PostId);
            });

            builder.Entity<UserFollowing>(b =>
            {
                b.HasKey(k => new { k.ObserverId, k.TargetId });

                b.HasOne(o => o.Observer)
                    .WithMany(f => f.Followings)
                    .HasForeignKey(b => b.ObserverId);

                b.HasOne(o => o.Target)
                    .WithMany(f => f.Followers)
                    .HasForeignKey(b => b.TargetId);
            });

            builder.Entity<UserTag>(b =>
            {
                b.HasKey(k => new { k.UserId, k.TagId });

                b.HasOne(u => u.User)
                    .WithMany(u => u.UserTags)
                    .HasForeignKey(b => b.UserId);

                b.HasOne(t => t.Tag)
                    .WithMany(u => u.UserTags)
                    .HasForeignKey(b => b.TagId);
            });
        }
    }
}
