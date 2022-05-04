using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityFramework.Entity
{
    public enum Gender
    {
        Female = 0,
        Male = 1,
        Other = 2
    }
    public enum WorkStatus
    {
        Retired = 0,
        Working = 1,
        Unemployed = 2,
    }
    [Table("Citizen")]
    public class Citizen
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public long? CitizenId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }
        public long? UserId { get; set; }
        [StringLength(50)]
        public string CitizenName { get; set; }
        [StringLength(50)]
        public string UrlImage { get; set; }
        [StringLength(50)]
        public string IdentityNumber { get; set; }
        public DateTime DateOfBirth { get; set; }
        [StringLength(100)]
        public string Address { get; set; }
        public int? Gender { get; set; }
        public int? Job { get; set; }
    }
}
