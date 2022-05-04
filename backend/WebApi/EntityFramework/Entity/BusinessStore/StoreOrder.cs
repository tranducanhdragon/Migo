using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityFramework.Entity
{
    public class StoreOrder
    {
        public long StoreOrderId { get; set; }
        [ForeignKey("StoreObjectId")]
        public long? StoreObjectId { get; set; }
        public StoreObject StoreObject { get; set; }
        [ForeignKey("StoreItemId")]
        public long? StoreItemId { get; set; }
        public StoreItem StoreItem { get; set; }
        public long? OrdererId { get; set; }
        public string Orderer { get; set; }
        public int? Quantity { get; set; }
        public double? TotalPrice { get; set; }
        public int? Type { get; set; }
        public int? State { get; set; }
        public string Properties { get; set; }
        public DateTime? OrderDate { get; set; }
    }
}
