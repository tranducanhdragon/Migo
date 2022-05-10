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
    public class Event
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public long EventId { get; set; }
        public string EventName { get; set; }
        public string EventDescription { get; set; }
        public string EventImage { get; set; }
        public string EventStart { get; set; }
        public string EventEnd { get; set; }
    }
}
