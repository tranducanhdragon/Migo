using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Entities.Auditing;


namespace EntityFramework.Entity
{
    public class StoreObject
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public long StoreObjectId { get; set; }
        public int? StoreType { get; set; }
        public string Properties { get; set; }
        [StringLength(256)]
        public string Name { get; set; }
        [StringLength(256)]
        public string Owner { get; set; }
        public int? Like { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }
        public long? UserId { get; set; }
        public int State { get; set; }
    }
}
