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
        public string TourLocation { get; set; }
        public string TourName { get; set; }
        public string TourDescription { get; set; }
        public string TourPrice { get; set; }
        public string TourTime { get; set; }
        public string TourImage{ get; set; }
        public string TourGuideImage { get; set; }
        public string TourGuideName { get; set; }
    }
}
