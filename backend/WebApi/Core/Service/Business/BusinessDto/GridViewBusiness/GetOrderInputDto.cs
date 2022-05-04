
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyProject.Services.Bussiness.Dto
{
    public class GetOrderInputDto
    {

        public long? StoreOrderId { get; set; }
        public long? ObjectPartnerId { get; set; }
        public int? FormId { get; set; }
        public int? FormCase { get; set; } // Kiểu get dữ liệu
        public int? Type { get; set; }
        public int? TypeGoods { get; set; }
        public string Keyword { get; set; }
        public DateTime? FromDay { get; set; }
        public DateTime? ToDay { get; set; }

        public bool IsLoadmore { get; set; }

        public string PageSession { get; set; }
        public string Timelife { get; set; }
        public float? RateNumber { get; set; }

        public int MaxResultCount { get; set; }
        public int SkipCount { get; set; }
        public long? StoreObjectId { get; set; }
        public int? State { get; set; }
    }
}
