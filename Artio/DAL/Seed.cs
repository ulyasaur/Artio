using Core.Entitites;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class Seed
    {
        public static async Task SeedData(ApplicationContext context,
            UserManager<User> userManager)
        {
            if (!userManager.Users.Any() 
                && !context.Posts.Any()
                && !context.Tags.Any())
            {
                var users = new List<User>
                {
                    new User
                    {
                        DisplayName = "Bob",
                        UserName = "bob",
                        Email = "bob@test.com"
                    },
                    new User
                    {
                        DisplayName = "Jane",
                        UserName = "jane",
                        Email = "jane@test.com"
                    },
                    new User
                    {
                        DisplayName = "Tom",
                        UserName = "tom",
                        Email = "tom@test.com"
                    },
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }

                var tags = new List<Tag>
                {
                    new Tag
                    {
                        TagName = "anime"
                    },
                    new Tag
                    {
                        TagName = "cat"
                    },
                    new Tag
                    {
                        TagName = "dog"
                    },
                    new Tag
                    {
                        TagName = "nature"
                    },
                    new Tag
                    {
                        TagName = "digital_art"
                    },
                    new Tag
                    {
                        TagName = "traditional_art"
                    }
                };

                await context.Tags.AddRangeAsync(tags);

                var posts = new List<Post>
                {
                    new Post
                    {
                        Description = "very interesting description",
                        CreatedAt = DateTimeOffset.Now.AddDays(-3),
                        User = users[0],   
                        PostTags = new List<PostTag>
                        {
                            new PostTag
                            {
                                Tag = tags[0]
                            },
                            new PostTag
                            {
                                Tag = tags[2]
                            }
                        }
                    },
                    new Post
                    {
                        Description = "not very interesting description",
                        CreatedAt = DateTimeOffset.Now.AddDays(-8),
                        User = users[0],   
                        PostTags = new List<PostTag>
                        {
                            new PostTag
                            {
                                Tag = tags[1]
                            },
                            new PostTag
                            {
                                Tag = tags[4]
                            },
                            new PostTag
                            {
                                Tag = tags[3]
                            }
                        }
                    },
                    new Post
                    {
                        Description = "yipeeee",
                        CreatedAt = DateTimeOffset.Now.AddDays(-20),
                        User = users[0],   
                        PostTags = new List<PostTag>
                        {
                            new PostTag
                            {
                                Tag = tags[0]
                            }
                        }
                    }
                };
            }
        }
    }
}
