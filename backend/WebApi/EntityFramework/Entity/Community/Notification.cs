using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityFramework.Entity
{
    [Table("Notification")]
    public class Notification
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public long NotificationId { get; set; }
        public string UrlImage { get; set; }
        public int NotificationType { get; set; }
        [StringLength(200)]
        public string Content { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }
        public long UserId { get; set; }
    }
}
