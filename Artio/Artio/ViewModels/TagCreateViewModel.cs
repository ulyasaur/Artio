using System.ComponentModel.DataAnnotations;

namespace Artio.ViewModels
{
    public class TagCreateViewModel
    {
        [Required]
        public string TagName { get; set; }
    }
}
