using Abp.Application.Services;
using Abp.Domain.Repositories;
using AutoMapper;
using Core.Repository;
using Core.Service.Base;
using EntityFramework.Entity;
using MyProject.Services.Bussiness.Dto;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Core.Service
{
    public interface IBuyerBusinessAppService : IApplicationService
    {
        #region Items
        #endregion
        #region Order
        Task<object> GetAllOrderAsync(OrderDto input);
        Task<object> CreateOrUpdateOrderAsync(OrderDto input);
        Task<object> CreateOrderManyAsync(List<OrderDto> input);
        Task<object> DeleteOrderAsync(long id);
        #endregion
        #region Rating
        //Task<object> CreateOrUpdateRateAsync(RateDto input);
        //Task<object> DeleteRateAsync(long id);
        #endregion
    }

    public  class BuyerBusinessAppService : BaseService<StoreItem>, IBuyerBusinessAppService
    {

        private readonly IStoreObjectRepository _storeObjectRepos;
        private readonly IStoreItemRepository _storeItemRepos;
        private readonly IStoreOrderRepository _storeOrderRepos;
        private IMapper _mapper;
        //private readonly IRepository<Rate, long> _rateRepos;

        public BuyerBusinessAppService(
            IStoreObjectRepository storeObjectRepos,
            IStoreItemRepository storeItemsRepos,
            IStoreOrderRepository storeOrderRepos,
            IMapper mapper
            //IRepository<Rate, long> rateRepos
            ):base(storeItemsRepos)
        {
            _storeObjectRepos = storeObjectRepos;
            _storeItemRepos = storeItemsRepos;
            _storeOrderRepos = storeOrderRepos;
            _mapper = mapper;
            //_rateRepos = rateRepos;
        }


        #region Items
        #endregion

        #region Voucher
        #endregion

        #region Order
        public async Task<object> GetAllOrderAsync(OrderDto input)
        {
            try
            {
                var result = _storeOrderRepos.GetMany(o => o.OrdererId == input.OrdererId);
                var data = DataResultCommon.ResultSuccess(result, "Get success");
                return data;    
            }
            catch (Exception ex)
            {
                var data = DataResult.ResultError(ex.ToString(), "Exception");
                return data;
            }

        }

        public async Task<object> CreateOrUpdateOrderAsync(OrderDto input)
        {
            try
            {

                if (input.StoreOrderId > 0)
                {
                    //update
                    var order = _mapper.Map<StoreOrder>(input);
                    _storeOrderRepos.Update(order);

                    var data = DataResultCommon.ResultSuccess(order, "Update success !");
                    return data;
                }
                else
                {
                    //Insert
                    var order = _mapper.Map<StoreOrder>(input);
                    _storeOrderRepos.Create(order);

                    var data = DataResultCommon.ResultSuccess(order, "Insert success !");
                    return data;
                }


            }
            catch (Exception e)
            {
                var data = DataResult.ResultError(e.ToString(), "Exception");
                return data;
            }
        }

        [Obsolete]
        public async Task<object> CreateOrderManyAsync(List<OrderDto> inputOrder)
        {
            try
            {
                foreach(OrderDto orderDto in inputOrder)
                {
                    //Insert
                    var order = _mapper.Map<StoreOrder>(orderDto);
                    _storeOrderRepos.Create(order);
                }

                var data = DataResultCommon.ResultSuccess(inputOrder, "Insert success!");
                return data;


            }
            catch (Exception e)
            {
                var data = DataResult.ResultError(e.ToString(), "Exception");
                return data;
            }
        }

        public async Task<object> DeleteOrderAsync(long id)
        {
            try
            {
                var order = _storeOrderRepos.GetById(id);
                _storeOrderRepos.Delete(order);
                var data = DataResult.ResultSuccess("Delete Success");
                return data;
            }
            catch (Exception ex)
            {
                var data = DataResult.ResultError(ex.ToString(), "Có lỗi");
                return data;
            }
        }


        #endregion

        #region Rate
        //public async Task<object> CreateOrUpdateRateAsync(RateDto input)
        //{
        //    try
        //    {

        //        if (input.Id > 0)
        //        {
        //            //update
        //            var updateData = await _rateRepos.GetAsync(input.Id);
        //            if (updateData != null)
        //            {
        //                input.MapTo(updateData);

        //                //call back
        //                await _rateRepos.UpdateAsync(updateData);
        //            }
        //            var data = DataResult.ResultSucces(updateData, "Update success !");
        //            return data;
        //        }
        //        else
        //        {
        //            //Insert
        //            var insertInput = input.MapTo<Rate>();
        //            long id = await _rateRepos.InsertAndGetIdAsync(insertInput);

        //            var data = DataResult.ResultSucces(insertInput, "Insert success !");
        //            return data;
        //        }


        //    }
        //    catch (Exception e)
        //    {
        //        var data = DataResult.ResultError(e.ToString(), "Exception !");
        //        Logger.Fatal(e.Message);
        //        return data;
        //    }
        //}


        //public async Task<object> DeleteRateAsync(long id)
        //{
        //    try
        //    {
        //        await _orderRepos.DeleteAsync(id);
        //        var data = DataResult.ResultSucces("Delete Success");
        //        return data;
        //    }
        //    catch (Exception ex)
        //    {
        //        var data = DataResult.ResultError(ex.ToString(), "Có lỗi");
        //        Logger.Fatal(ex.Message, ex);
        //        return data;
        //    }
        //}
        #endregion

    }
}
