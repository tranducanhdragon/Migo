using AutoMapper;
using EntityFramework.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyProject.Services.Bussiness.Dto
{

    [AutoMap(typeof(StoreObject))]
    public class ObjectDto : StoreObject
    {
        //public IEnumerable<Rate> Rates { get; set; }
        public IEnumerable<StoreItem> Items { get; set; }
        public int? CountRate { get; set; }
        public float? Rate { get; set; }
        public double? RatePoint { get; set; }
        public int? NumberRate { get; set; }
        public double? Distance { get; set; }
       // public float[] LocationMap { get; set; }
    }

    [AutoMap(typeof(StoreItem))]
    public class ItemsDto : StoreItem
    {
        public string ShopName { get; set; }
        //public IEnumerable<Rate> Rates { get; set; }
        public int? CountRate { get; set; }
        public float? Rate { get; set; }

    }

    //[AutoMap(typeof(Rate))]
    //public class RateDto : Rate
    //{
    //    public ItemsDto Item { get; set; }
    //    public Rate Answerd { get; set; }
    //    public bool? IsItemReview { get; set; }
    //    public bool? HasAnswered { get; set; }

    //}


    //[AutoMap(typeof(ItemType))]
    //public class ItemTypeDto : ItemType
    //{

    //}

    //[AutoMap(typeof(SetItems))]
    //public class SetItemsDto : SetItems
    //{

    //}

    [AutoMap(typeof(StoreOrder))]
    public class OrderDto : StoreOrder
    {

    }

    //[AutoMap(typeof(Voucher))]
    //public class VoucherDto : Voucher
    //{

    //}
    public class OrderFilterDto {
        public int? Type { get; set; }
        public int? State { get; set; }
    }

}
