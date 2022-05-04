using Abp.Application.Services;
using Abp.Collections.Extensions;
using Abp.Domain.Repositories;
using Core;
using Core.Repository;
using Core.Service.Base;
using EntityFramework.Entity;
using MyProject.Services.Bussiness;
using MyProject.Services.Bussiness.Dto;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Service
{

    public interface IBusinessGridViewAppRateService: IBaseService<StoreObject>
    {
        Task<object> GetRateDataAsync(GetRateInputDto input);
    }

    public class BusinessGridViewAppRateService: BaseService<StoreObject>, IBusinessGridViewAppRateService
    {
        private readonly IStoreObjectRepository _objectPartnerRepos;
        private readonly IStoreItemRepository _itemsRepos;
        //private readonly IRepository<Rate, long> _rateRepos;

        public BusinessGridViewAppRateService(
            IStoreObjectRepository objectPartnerRepos,
            IStoreItemRepository itemsRepos
            //IRepository<Rate, long> rateRepos
            ):base(objectPartnerRepos)
        {
            _objectPartnerRepos = objectPartnerRepos;
            _itemsRepos = itemsRepos;
            //_rateRepos = rateRepos;
        }

        protected IQueryable<ItemsDto> QueryGetAllData(GetRateInputDto input)
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
                             select new ItemsDto()
                             {
                                Name = item.Name,
                                Properties = item.Properties   
                             })
                             .WhereIf(input.ItemId != null, x => x.StoreItemId == input.ItemId)
                             .AsQueryable();

                return query;

            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<object> GetRateDataAsync(GetRateInputDto input)
        {
            try
            {

                var obj = new object();
                var query = QueryGetAllData(input);
                var count = query.Count();
                var list =  query.ToList();

                var data = DataResultCommon.ResultSuccess(list, "Get success");
                return data;
            }
            catch (Exception ex)
            {
                var data = DataResultCommon.ResultError(ex.ToString(), "Exception");
                return data;
            }
        }
    }
}
