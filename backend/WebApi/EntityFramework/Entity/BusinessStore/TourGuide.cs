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
    public class TourGuide
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public long TourGuideId { get; set; }
        [MaxLength(50)]
        public string TourGuideName { get; set; }
        public string TourGuideDescription { get; set; }
        [MaxLength(100)]
        public string TourGuideImage { get; set; }
    }
}
