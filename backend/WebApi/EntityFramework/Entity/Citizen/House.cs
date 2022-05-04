using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityFramework.Entity
{
    [Table("House")]
    public class House
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public long HouseId { get; set; }
        [StringLength(100)]
        public string Address { get; set; }
        [StringLength(50)]
        public string UrlImage { get; set; }
        public int? HouseArea { get; set; }
        public int? HouseType { get; set; }
        public long? CadastralMapNumber { get; set; }
        public long? LandNumber { get; set; }
    }
}
