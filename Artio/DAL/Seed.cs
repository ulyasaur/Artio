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

                var users = new List<User>
                {
                    new User
                    {
                        DisplayName = "Bob",
                        UserName = "bob",
                        Email = "bob@test.com",
                        UserTags = new List<UserTag>
                        {
                            new UserTag
                            {
                                Tag = tags[0]
                            },
                            new UserTag
                            {
                                Tag = tags[1]
                            },
                            new UserTag
                            {
                                Tag = tags[3]
                            }
                        }
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


                var photos = new List<Photo> {
                    new Photo { Id = "1", Url = "" },
                    new Photo { Id = "2", Url = "" },
                    new Photo { Id = "3", Url = "" }
                };

                await context.Photos.AddRangeAsync(photos);

                var posts = new List<Post>
                {
                    new Post
                    {
                        Image = photos[0],
                        Description = "very interesting description",
                        CreatedAt = DateTimeOffset.UtcNow.AddDays(-3),
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
                        Image = photos[1],
                        Description = "not very interesting description",
                        CreatedAt = DateTimeOffset.UtcNow.AddDays(-8),
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
                        Image = photos[2],
                        Description = "yipeeee",
                        CreatedAt = DateTimeOffset.UtcNow.AddDays(-20),
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

                await context.Posts.AddRangeAsync(posts);

                await context.SaveChangesAsync();
            }
        }
    }
}
