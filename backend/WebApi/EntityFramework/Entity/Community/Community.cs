using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityFramework.Entity
{
    [Table("Community")]
    public class Community
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public long CommunityId { get; set; }
        [StringLength(100)]
        public string ServiceName { get; set; }
        public string Description { get; set; }
        public int? ServicePrice { get; set; }
        [StringLength(50)]
        public string UrlImage { get; set; }
        public bool IsActive { get; set; }
    }
}
