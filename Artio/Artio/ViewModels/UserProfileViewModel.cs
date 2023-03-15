namespace Artio.ViewModels
{
    public class UserProfileViewModel
    {
        public string Id { get; set; }

        public string Username { get; set; }

        public string DisplayName { get; set; }

        public PhotoViewModel Image { get; set; }

        public PhotoViewModel Background { get; set; }

        public string Bio { get; set; }

        public int FollowersCount { get; set; }

        public int FollowingsCount { get; set; }

        public List<TagViewModel> Tags { get; set; }
    }
}
