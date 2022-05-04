using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityFramework.Entity
{
    [Table("HouseDetail")]
    public class HouseDetail
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public long HouseDetailId { get; set; }
        [ForeignKey("HouseId")]
        public House House { get; set; }
        public long? HouseId { get; set; }
        [ForeignKey("CitizenId")]
        public Citizen Citizen { get; set; }
        public long? CitizenId { get; set; }

    }
}
