namespace Artio.ViewModels
{
    public class UserProfileViewModel
    {
        public string UserId { get; set; }

        public string Username { get; set; }

        public string DisplayName { get; set; }

        public string ImageUrl { get; set; }

        public string Bio { get; set; }

        public int FollowersCount { get; set; }

        public int FollowingsCount { get; set; }

        public List<TagViewModel> Tags { get; set; }
    }
}
