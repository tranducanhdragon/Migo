using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityFramework.Entity
{
    public enum ChatSide
    {
        Sender = 1,
        Receiver = 2
    }
    public enum ChatMessageReadState
    {
        Unread = 1,
        Read = 2
    }
    [Table("ChatMessage")]
    public class ChatMessage
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public long ChatMessageId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }
        public long UserId { get; set; }
        public long TargetUserId { get; set; }
        public string Message { get; set; }
        public DateTime CreationTime { get; set; }
        public ChatSide Side { get; set; }
        public ChatMessageReadState ReadState { get; private set; }
    }
}
