using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityFramework.Entity
{
    public enum FriendshipState
    {
        Accepted = 1,
        NotFriend = 2,
        Requesting = 3,
    }
    [Table("FriendShip")]
    public class FriendShip
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public long FriendShipId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }
        public long UserId { get; set; }
        public long FriendUserId { get; set; }
        public FriendshipState State { get; set; }
        public bool isOnline { get; set; }
        public DateTime CreationTime { get; set; }
    }
}
