using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.HubSpace
{
    public class ChatMessageDto
    {

        public long UserId { get; set; }
        public string Message { get; set; }
        public long TargetUserId { get; set; }
        public int? Side { get; set; }
        public int? ReadState { get; set; }
        public DateTime? CreationTime { get; set; }
    }
}
