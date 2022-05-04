using Abp.Application.Services;
using Abp.Collections.Extensions;
using Abp.Domain.Repositories;
using Abp.Linq.Extensions;
using Core;
using Core.Repository;
using Core.Service.Base;
using EntityFramework.Entity;
using MyProject.Services.Bussiness.Dto;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Concurrent;
using System.Linq;
using System.Threading.Tasks;
using Core.Enum;
using AutoMapper;

namespace Core.Service
{
    public interface IBusinessItemAppService : IBaseService<StoreItem>
    {
        Task<object> GetItemDataAsync(GetItemInputDto input);
        Task<object> CreateOrUpdateItem(ItemsDto input);

    }
    public class BusinessItemAppService : BaseService<StoreItem>, IBusinessItemAppService
    {

        private readonly IStoreObjectRepository _objectRepos;
        private readonly IStoreItemRepository _itemsRepos;
        private readonly IStoreOrderRepository _ordersRepos;
        private IMapper _mapper;

        //private readonly IRepository<Rate, long> _rateRepos;

        private static ConcurrentDictionary<string, IQueryable<ItemsDto>> listQuery = new ConcurrentDictionary<string, IQueryable<ItemsDto>>();

        public BusinessItemAppService(
            IStoreObjectRepository objectRepos,
            IStoreItemRepository itemsRepos,
            IMapper mapper
            //IRepository<Rate, long> rateRepos
            ) : base(itemsRepos)
        {
            _objectRepos = objectRepos;
            _itemsRepos = itemsRepos;
            _mapper = mapper;
            //_rateRepos = rateRepos;
        }

        protected IQueryable<ItemsDto> QueryGetAllDataItem(GetItemInputDto input)
        {
            try
            {
                DateTime fromDay = new DateTime(), toDay = new DateTime();
                if (input.FromDay.HasValue)
                {
                    fromDay = new DateTime(input.FromDay.Value.Year, input.FromDay.Value.Month, input.FromDay.Value.Day, 0, 0, 0);

                }
                if (input.ToDay.HasValue)
                {
                    toDay = new DateTime(input.ToDay.Value.Year, input.ToDay.Value.Month, input.ToDay.Value.Day, 23, 59, 59);

                }

                var query = (from item in _itemsRepos.GetAll()
                             join obj in _objectRepos.GetAll() on item.StoreObjectId equals obj.StoreObjectId into tb_obj
                             from obj in tb_obj.DefaultIfEmpty()
                             select new ItemsDto()
                             {
                                 StoreItemId = item.StoreItemId,
                                 Like = item.Like,
                                 Name = item.Name,
                                 ShopName = obj.Name,
                                 Properties = item.Properties,
                                 Type = item.Type,
                                 StoreObjectId = item.StoreObjectId,
                                 State = item.State,

                             })
                             .WhereIf(input.StoreItemId > 0, u => u.StoreItemId == input.StoreItemId)
                             .WhereIf(input.Keyword != null, u => u.Name.Contains(input.Keyword))
                             .AsQueryable();

                #region Data Common
                #endregion
                #region Truy van tung Form

                switch (input.FormId)
                {
                    //san pham moi dang ky
                    case (int)CommonENumItem.FORM_ID_ITEM.FORM_ADMIN_GET_ITEM_NEW:
                        query = query.Where(x => x.State == null || x.State == (int)CommonENumItem.STATE_ITEM.NEW);
                        break;
                    //san pham da duoc duyet
                    case (int)CommonENumItem.FORM_ID_ITEM.FORM_ADMIN_GET_ITEM_ACTIVE:
                        query = query.Where(x => x.State != null && x.State == (int)CommonENumItem.STATE_ITEM.ACTIVE);
                        break;
                    case (int)CommonENumItem.FORM_ID_ITEM.FORM_ADMIN_GET_ITEM_GETALL:
                        break;
                    case (int)CommonENumItem.FORM_ID_ITEM.FORM_ADMIN_ITEM_REFUSE:
                        query = query.Where(x => x.State != null && x.State == (int)CommonENumItem.STATE_ITEM.REFUSE);
                        break;
                    case (int)CommonENumItem.FORM_ID_ITEM.FORM_ADMIN_ITEM_DISABLE:
                        query = query.Where(x => x.State != null && x.State == (int)CommonENumItem.STATE_ITEM.DISABLE);
                        break;
                    case (int)CommonENumItem.FORM_ID_ITEM.FORM_PARTNER_ITEM_GETALL:
                        query = query.Where(x => x.StoreObjectId == input.StoreObjectId);
                        break;
                    case (int)CommonENumItem.FORM_ID_ITEM.FORM_PARTNER_ITEM_ACTIVE:
                        query = query.Where(x => (x.State == (int)CommonENumItem.STATE_ITEM.ACTIVE) && x.StoreObjectId == input.StoreObjectId);
                        //query = query.Where(x => (x.State == (int)CommonENumItem.STATE_ITEM.ACTIVE));
                        break;
                    case (int)CommonENumItem.FORM_ID_ITEM.FORM_PARTNER_ITEM_NEW:
                        query = query.Where(x => (x.State == null || x.State == (int)CommonENumItem.STATE_ITEM.NEW) && x.StoreObjectId == input.StoreObjectId);
                        break;
                    case (int)CommonENumItem.FORM_ID_ITEM.FORM_PARTNER_ITEM_DETAIL:
                        query = query.Where(x => x.StoreObjectId == input.StoreObjectId);
                        break;
                    case (int)CommonENumItem.FORM_ID_ITEM.FORM_PARTNER_ITEM_DISABLE:
                        query = query.Where(x => (x.State == (int)CommonENumItem.STATE_ITEM.DISABLE) && x.StoreObjectId == input.StoreObjectId);
                        break;
                    case (int)CommonENumItem.FORM_ID_ITEM.FORM_PARTNER_ITEM_REFUSE:
                        query = query.Where(x => (x.State == (int)CommonENumItem.STATE_ITEM.DISABLE) && x.StoreObjectId == input.StoreObjectId);
                        break;
                    case (int)CommonENumItem.FORM_ID_ITEM.FORM_USER_ITEM_GETALL:
                        //query = query.Where(x => x.State == (int)CommonENumItem.STATE_ITEM.ACTIVE).OrderByDescending(x => x.LastModificationTime);
                        break;
                    case (int)CommonENumItem.FORM_ID_ITEM.FORM_USER_ITEM_HIGHT_RATE:
                        query = query.Where(x => x.State == (int)CommonENumItem.STATE_ITEM.ACTIVE).OrderByDescending(x => x.Rate);
                        break;
                    case (int)CommonENumItem.FORM_ID_ITEM.FORM_USER_ITEM_LOW_RATE:
                        query = query.Where(x => x.State == (int)CommonENumItem.STATE_ITEM.ACTIVE).OrderByDescending(x => x.Rate.HasValue).ThenBy(x => x.Rate);
                        break;
                    case (int)CommonENumItem.FORM_ID_ITEM.FORM_USER_ITEM_DETAIL:
                        //query = (from obj in query
                        //         join pd in _itemsRepos.GetAll() on obj.Id equals pd.ObjectPartnerId
                        //         select obj 
                        //         )
                        break;
                    case (int)CommonENumItem.FORM_ID_ITEM.FORM_USER_ITEM_GETALL_BY_OBJECT:
                        query = query.Where(x => x.StoreObjectId == input.StoreObjectId);
                        break;
                    case (int)CommonENumItem.FORM_ID_ITEM.FORM_USER_ITEM_GETALL_BY_RATE:
                        query = query.Where(x => x.Rate != null && x.Rate > (input.RateNumber - 1) && x.Rate <= input.RateNumber);
                        break;

                }

                #endregion

                return query;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public async Task<object> GetItemDataAsync(GetItemInputDto input)
        {
            try
            {

                var obj = new object();
                var query = QueryGetAllDataItem(input);
                var count = query.Count();
                if (input.FormCase == null || input.FormCase == 1)
                {

                    //var list = query.Skip(input.MaxResultCount).Take(input.SkipCount).ToList();
                    var list = query.ToList();
                    obj = list;

                }
                else if (input.FormCase == 2)
                {
                    obj = query.FirstOrDefault();
                }

                var data = DataResultCommon.ResultSuccess(obj, "Get success");
                return data;
            }
            catch (Exception ex)
            {
                var data = DataResultCommon.ResultError(ex.ToString(), "Exception");
                return data;
            }
        }

        public async Task<object> CreateOrUpdateItem(ItemsDto input)
        {
            try
            {

                if (input.StoreItemId > 0)
                {
                    //update
                    var storeItem = _mapper.Map<StoreItem>(input);
                    _itemsRepos.Update(storeItem);

                    return DataResultCommon.ResultSuccess(storeItem, "Update success!");
                }
                else
                {
                    //Insert
                    var storeItem = _mapper.Map<StoreItem>(input);
                    _itemsRepos.Create(storeItem);

                    var data = DataResultCommon.ResultSuccess(storeItem, "Insert success !");
                    return data;
                }


            }
            catch (Exception e)
            {
                var data = DataResult.ResultError(e.ToString(), "Exception");
                return data;
            }
        }

    }
}
