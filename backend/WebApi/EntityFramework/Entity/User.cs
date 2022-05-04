using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityFramework.Entity
{
    [Table("User")]
    public class User
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public long UserId { set; get; }
        [StringLength(50)]
        public string UserName { set; get; }
        public string FullName { get; set; }
        [StringLength(50)]
        public string Email { set; get; }
        [StringLength(50)]
        public string Password { set; get; }
        public int RoleId { get; set; }
        [ForeignKey("RoleId")]
        public Role Role { get; set; }
        public string UrlImage { get; set; }
        [StringLength(20)]
        public string IdentityNumber { get; set; }
        [StringLength(10)]
        public string PhoneNumber { get; set; }
    }
}
