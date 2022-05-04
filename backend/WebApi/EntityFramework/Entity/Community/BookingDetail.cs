using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityFramework.Entity
{
    [Table("BookingDetail")]
    public class BookingDetail
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public long BookingDetailId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }
        public long? UserId { get; set; }
        public string IdentityNumber { get; set; }
        public string PhoneNumber { get; set; }
        public string FullName { get; set; }
        [ForeignKey("CommunityId")]
        public Community Community{ get; set; }
        public long? CommunityId { get; set; }
        public string ServiceName { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int Total { get; set; }
        public int? State { get; set; }
        public DateTime CreationTime { get; set; }
    }
}
