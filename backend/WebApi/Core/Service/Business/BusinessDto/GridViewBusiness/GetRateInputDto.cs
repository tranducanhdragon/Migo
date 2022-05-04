﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyProject.Services.Bussiness.Dto
{
    public class GetRateInputDto
    {
        public long? Id { get; set; }
        public long? ObjectPartnerId { get; set; }
        public long? ItemId { get; set; }
        public int? FormId { get; set; }
        public int? FormCase { get; set; }
        public string Keyword { get; set; }
        public DateTime? FromDay { get; set; }
        public DateTime? ToDay { get; set; }
    }
}
