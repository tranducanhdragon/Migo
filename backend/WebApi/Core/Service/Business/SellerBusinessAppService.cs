using Abp.Application.Services;
using Abp.Domain.Repositories;
using Core;
using Core.Repository;
using Core.Service.Base;
using EntityFramework.Entity;
using MyProject.Services.Bussiness.Dto;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;

namespace Core.Service
{
    public interface ISellerBusinessAppService : IBaseService<StoreObject>
    {
        #region Object
        Task<object> GetAllObjectAsync();
        Task<object> GetObjectByTypeAsync(int type);
        Task<object> CreateOrUpdateObject(ObjectDto input);
        Task<object> DeleteObject(long id);
        #endregion
        #region Items
        Task<object> GetAllItemsAsync();
        Task<object> CreateOrUpdateItemsAsync(ItemsDto input);
        Task<object> DeleteItemsAsync(long id);
        #endregion
        #region Order
        Task<object> CreateOrUpdateOrderAsync(OrderDto input);
        Task<object> GetAllOrderAsync(OrderDto input);
        Task<object> DeleteOrderAsync(long id);
        #endregion

    }

    public class SellerBusinessAppService: BaseService<StoreObject>, ISellerBusinessAppService
    {

        private readonly IStoreObjectRepository _objectPartnerRepos;
        private readonly IStoreItemRepository _itemsRepos;
        private readonly IStoreOrderRepository _orderRepos;
        private readonly IUserRepository _userRepos;
        private IMapper _mapper;

        public SellerBusinessAppService(
            IStoreObjectRepository objectPartnerRepos,
            IStoreItemRepository itemsRepos,
            IStoreOrderRepository orderRepos,
            IUserRepository userRepos,
            IMapper mapper
            ) : base(objectPartnerRepos)
        {
            _objectPartnerRepos = objectPartnerRepos;
            _itemsRepos = itemsRepos;
            _orderRepos = orderRepos;
            _userRepos = userRepos;
            _mapper = mapper;
        }


        #region Object
        public async Task<object> GetAllObjectAsync()
        {
            try
            {
                var result = _objectPartnerRepos.GetAll();
                var data = DataResultCommon.ResultSuccess(result, "Get success");
                return data;
            }
            catch (Exception ex)
            {
                var data = DataResultCommon.ResultError(ex.ToString(), "Exception");
                return data;
            }
        }

        public async Task<object> GetObjectByTypeAsync(int type)
        {
            try
            {
                var result = _objectPartnerRepos.GetMany(x => x.StoreType == type).FirstOrDefault();
                var data = DataResultCommon.ResultSuccess(result, "Get success");
                return data;
            }
            catch (Exception ex)
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
                    var updateData = _objectPartnerRepos.GetById(input.StoreObjectId);
                    if (updateData != null)
                    {
                        //input.MapTo(updateData);

                        ////call back
                        //await _objectPartnerRepos.Update(updateData);
                    }

                    return 0;
                }
                else
                {
                    //Insert
                    //var insertInput = input.MapTo<ObjectPartner>();
                    //long id = await _objectPartnerRepos.InsertAndGetIdAsync(insertInput);

                    var data = DataResultCommon.ResultSuccess(null, "Insert success !");
                    return data;
                }


            }
            catch (Exception e)
            {
                var data = DataResult.ResultError(e.ToString(), "Exception");
                return data;
            }
        }

        public async Task<object> DeleteObject(long id)
        {
            try
            {
                //_objectPartnerRepos.Delete(id);
                var data = DataResultCommon.ResultSuccess( "Delete Success");
                return data;
            }
            catch (Exception ex)
            {
                var data = DataResult.ResultError(ex.ToString(), "Có lỗi");
                return data;
            }
        }
        #endregion

        #region Items
        public async Task<object> GetAllItemsAsync()
        {
            try
            {
                var result = _itemsRepos.GetAll();
                var data = DataResultCommon.ResultSuccess(result, "Get success");
                return data;
            }
            catch (Exception ex)
            {
                var data = DataResult.ResultError(ex.ToString(), "Có lỗi");
                return data;
            }

        }

        public async Task<object> CreateOrUpdateItemsAsync(ItemsDto input)
        {
            try
            {

                if (input.StoreItemId > 0)
                {
                    //update
                    var updateData = _itemsRepos.GetById(input.StoreItemId);
                    if (updateData != null)
                    {
                        //input.MapTo(updateData);

                        ////call back
                        //await _itemsRepos.UpdateAsync(updateData);
                    }

                    var data = DataResultCommon.ResultSuccess(updateData, "Update success !");
                    return data;
                }
                else
                {
                    //Insert
                    //var insertInput = input.MapTo<Items>();
                    //long id = await _itemsRepos.InsertAndGetIdAsync(insertInput);

                    var data = DataResultCommon.ResultSuccess(null, "Insert success !");
                    return data;
                }


            }
            catch (Exception e)
            {
                var data = DataResult.ResultError(e.ToString(), "Exception");
                return data;
            }
        }


        public async Task<object> DeleteItemsAsync(long id)
        {
            try
            {
                //_itemsRepos.DeleteAsync(id);
                var data = DataResultCommon.ResultSuccess( "Delete Success");
                return data;
            }
            catch (Exception ex)
            {
                var data = DataResult.ResultError(ex.ToString(), "Có lỗi");
                return data;
            }
        }
        #endregion

        #region Order

        public async Task<object> GetAllOrderAsync(OrderDto input)
        {
            try
            {
                var query = (from ord in _orderRepos.GetAll()
                         join obj in _objectPartnerRepos.GetAll() on ord.StoreObjectId equals obj.StoreObjectId into tb_obj
                         from obj in tb_obj.DefaultIfEmpty()
                         join user in _userRepos.GetAll() on ord.OrdererId equals user.UserId into tb_user
                         from user in tb_user.DefaultIfEmpty()
                         where obj.StoreObjectId == input.StoreObjectId
                         select new OrderDto()
                         {
                             StoreOrderId = ord.StoreOrderId,
                             OrdererId = ord.OrdererId,
                             Orderer = user.PhoneNumber,
                             State = ord.State,
                             Type = ord.Type,
                             StoreItemId = ord.StoreItemId,
                             Properties = ord.Properties,
                             Quantity = ord.Quantity,
                             OrderDate = ord.OrderDate,
                             StoreObjectId = obj.StoreObjectId,
                         });
                if (input.State != null)
                {
                    query = query.Where(o => o.State == input.State);
                }
                var result = query.Take(20).ToList();
                var data = DataResultCommon.ResultSuccess(result, "Get success");
                return data;
            }
            catch (Exception ex)
            {
                var data = DataResult.ResultError(ex.ToString(), "Có lỗi");
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
                    var updateData = _mapper.Map<StoreOrder>(input);
                    _orderRepos.Update(updateData);
                    return DataResultCommon.ResultSuccess(updateData, "Update success !");
                }
                else
                {
                    //Insert
                    var insertData = _mapper.Map<StoreOrder>(input);
                    _orderRepos.Create(insertData);
                    var data = DataResultCommon.ResultSuccess(insertData, "Insert success !");
                    return data;
                }


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
                //_orderRepos.Delete(id);
                var data = DataResultCommon.ResultSuccess("Delete Success");
                return data;
            }
            catch (Exception ex)
            {
                var data = DataResult.ResultError(ex.ToString(), "Có lỗi");
                return data;
            }
        }

        #endregion

    }
}
