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
    public class Tour
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public long TourId { get; set; }
        [MaxLength(50)]
        public string TourLocation { get; set; }
        [MaxLength(50)]
        public string TourName { get; set; }
        public string TourDescription { get; set; }
        public double TourPrice { get; set; }
        public string TourTime { get; set; }
        [MaxLength(100)]
        public string TourImage{ get; set; }
        [MaxLength(100)]
        public string TourGuideImage { get; set; }
        [MaxLength(50)]
        public string TourGuideName { get; set; }
    }
}
