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
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Core.Enum;

namespace Core.Service
{
    public interface IBusinessObjectAppService : IBaseService<StoreObject>
    {
        Task<object> GetObjectDataAsync(GetObjectInputDto input);
        Task<object> CreateOrUpdateObject(ObjectDto input);
    }

    public class BusinessObjectAppService: BaseService<StoreObject>, IBusinessObjectAppService
    {

        private readonly IStoreObjectRepository _objectPartnerRepos;
        private IMapper _mapper;

        //private readonly IRepository<Rate, long> _rateRepos;

        public BusinessObjectAppService(
             IStoreObjectRepository objectPartnerRepos,
            IStoreItemRepository itemsRepos,
            IMapper mapper
            //IRepository<Rate, long> rateRepos
            ) : base(objectPartnerRepos)
        {
            _objectPartnerRepos = objectPartnerRepos;
            _mapper = mapper;
            //_rateRepos = rateRepos;
        }


        protected IQueryable<ObjectDto> QueryGetAllDataObject(GetObjectInputDto input)
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
                var startPoint = new { Latitude = 1.123, Longitude = 12.3 };

              
                var query = (from obj in _objectPartnerRepos.GetAll()
                             //where obj.Type == input.Type
                             select new ObjectDto()
                             {
                                 StoreType = obj.StoreType,
                                 StoreObjectId  = obj.StoreObjectId,
                                 UserId = obj.UserId,
                                 Like = obj.Like,
                                 Name = obj.Name,
                                 Owner = obj.Owner,
                                 State = obj.State,
                                 Properties = obj.Properties,
                             })
                             .WhereIf(input.Type != null, u => u.StoreType == input.Type)
                             .WhereIf(input.Id.HasValue, u => u.StoreObjectId == input.Id)
                             .WhereIf(input.Keyword != null, u => u.Name.Contains(input.Keyword))
                             .AsQueryable();
                switch (input.FormId)
                {
                    //cua hang moi dang ky
                    case (int)CommonENumObject.FORM_ID_OBJECT.FORM_ADMIN_GET_OBJECT_NEW:
                        query = query.Where(x => x.State == (int)CommonENumObject.STATE_OBJECT.NEW);
                        break;
                    //cua hang da duoc duyet
                    case (int)CommonENumObject.FORM_ID_OBJECT.FORM_ADMIN_GET_OBJECT_ACTIVE:
                        query = query.Where(x => x.State == (int)CommonENumObject.STATE_OBJECT.ACTIVE);
                        break;
                    case (int)CommonENumObject.FORM_ID_OBJECT.FORM_ADMIN_GET_OBJECT_GETALL:
                        break;
                    case (int)CommonENumObject.FORM_ID_OBJECT.FORM_ADMIN_OBJECT_REFUSE:
                        query = query.Where(x => x.State == (int)CommonENumObject.STATE_OBJECT.REFUSE);
                        break;
                    case (int)CommonENumObject.FORM_ID_OBJECT.FORM_ADMIN_OBJECT_DISABLE:
                        query = query.Where(x => x.State == (int)CommonENumObject.STATE_OBJECT.DISABLE);
                        break;
                    case (int)CommonENumObject.FORM_ID_OBJECT.FORM_PARTNER_OBJECT_NEW:
                        query = query.Where(x => x.State == (int)CommonENumObject.STATE_OBJECT.NEW && x.UserId == input.UserId);
                        break;
                    case (int)CommonENumObject.FORM_ID_OBJECT.FORM_PARTNER_OBJECT_DETAIL:
                        query = query.Where(x => x.UserId == input.UserId);
                        break;
                    case (int)CommonENumObject.FORM_ID_OBJECT.FORM_USER_OBJECT_GETALL:
                        query = query.Where(x => x.State == (int)CommonENumObject.STATE_OBJECT.ACTIVE);
                        break;
                    case (int)CommonENumObject.FORM_ID_OBJECT.FORM_USER_OBJECT_HIGHT_RATE:
                        query = query.Where(x => x.State == (int)CommonENumObject.STATE_OBJECT.ACTIVE).OrderByDescending(x => x.Rate);
                        break;
                    case (int)CommonENumObject.FORM_ID_OBJECT.FORM_USER_OBJECT_LOW_RATE:
                        query = query.Where(x => x.State == (int)CommonENumObject.STATE_OBJECT.ACTIVE).OrderByDescending(x => x.Rate.HasValue).ThenBy(x => x.Rate);
                        break;
                    case (int)CommonENumObject.FORM_ID_OBJECT.FORM_USER_OBJECT_DETAIL:
                        //query = (from obj in query
                        //         join pd in _itemsRepos.GetAll() on obj.Id equals pd.ObjectPartnerId
                        //         select obj 
                        //         )
                        break;
                    case (int)CommonENumObject.FORM_ID_OBJECT.FORM_USER_OBJECT_LOCATIONMAP:
                        query = query.Where(x => x.State == (int)CommonENumObject.STATE_OBJECT.ACTIVE);
                        break;

                }
                return query;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<object> GetObjectDataAsync(GetObjectInputDto input)
        {
            try
            {
               
                var obj = new  object();
                var query = QueryGetAllDataObject(input);
                var count = query.Count();
                if (input.FormCase == null || input.FormCase == 1)
                {

                    //var list = query.Skip(input.MaxResultCount).Take(input.SkipCount).ToList();
                    var list = query.ToList();
                    obj = list;
                  
                }
                else if(input.FormCase == 2)
                {
                    obj = query.FirstOrDefault();
                }

                var data = DataResultCommon.ResultSuccess(obj, "Get success");
                return data;
            }
            catch(Exception ex)
            {
                var data = DataResultCommon.ResultError(ex.ToString(), "Exception");
                return data;
            }
        }
        

        public async Task<object> CreateOrUpdateObject(ObjectDto input)
        {
            try
            {

                if (input.StoreObjectId > 0)
                {
                    //update
                    var storeOject = _mapper.Map<StoreObject>(input);
                    _objectPartnerRepos.Update(storeOject);

                    return DataResultCommon.ResultSuccess(storeOject, "Update success!");
                }
                else
                {
                    //Insert
                    var storeOject = _mapper.Map<StoreObject>(input);
                    _objectPartnerRepos.Create(storeOject);

                    var data = DataResultCommon.ResultSuccess(storeOject, "Insert success!");
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
