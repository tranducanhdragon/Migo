using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityFramework.Entity
{
    public class StoreItem
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public long StoreItemId { get; set; }
        public string Properties { get; set; }
        public string Name { get; set; }
        [ForeignKey("StoreObjectId")]
        public long? StoreObjectId { get; set; }
        public StoreObject StoreObject { get; set; }
        public int? Like { get; set; }
        public int? Type { get; set; }
        public int? State { get; set; }
    }
}
