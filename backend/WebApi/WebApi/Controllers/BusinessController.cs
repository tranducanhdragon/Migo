using Core.Service;
using EntityFramework.Entity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MyProject.Services.Bussiness.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Const;
using WebApi.Controllers.Base;

namespace WebApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BusinessController : BaseController<StoreObject>
    {
        private IBusinessObjectAppService _objectService;
        private IBusinessItemAppService _itemService;
        private IBuyerBusinessAppService _buyerService;
        private ISellerBusinessAppService _sellerService;
        public BusinessController(IBusinessObjectAppService objectService, 
            IBusinessItemAppService itemService,
            IBuyerBusinessAppService buyerService,
            ISellerBusinessAppService sellerService,
            ILogger<BusinessController> logger) 
            : base(objectService, logger)
        {
            _objectService = objectService;
            _itemService = itemService;
            _buyerService = buyerService;
            _sellerService = sellerService;
        }
        [HttpGet("getobjectdata")]
        public IActionResult GetObjectData([FromQuery] GetObjectInputDto input)
        {
            try
            {
                var result = _objectService.GetObjectDataAsync(input);
                return Ok(result);
            }
            catch (Exception e)
            {
                base._log.LogInformation("GetAllStoreObject_Failed_" + e.Message);
                return Ok(e);
            }
        }
        [HttpGet("getitemdata")]
        public IActionResult GetItemData([FromQuery] GetItemInputDto input)
        {
            try
            {
                var result = _itemService.GetItemDataAsync(input);
                return Ok(result);
            }
            catch (Exception e)
            {
                base._log.LogInformation("GetAllStoreItem_Failed_" + e.Message);
                return Ok(e);
            }
        }
        [HttpGet("getorderdataseller")]
        public IActionResult GetOrderDataSeller([FromQuery] OrderDto input)
        {
            try
            {
                var result = _sellerService.GetAllOrderAsync(input);
                return Ok(result);
            }
            catch (Exception e)
            {
                base._log.LogInformation("GetAllStoreOrderSeller_Failed_" + e.Message);
                return Ok(e);
            }
        }

        [HttpGet("getorderdatabuyer")]
        public IActionResult GetOrderDataBuyer([FromQuery] OrderDto input)
        {
            try
            {
                var result = _buyerService.GetAllOrderAsync(input);
                return Ok(result);
            }
            catch (Exception e)
            {
                base._log.LogInformation("GetAllStoreOrderBuyer_Failed_" + e.Message);
                return Ok(e);
            }
        }

        [HttpPost("createorupdateobject")]
        public IActionResult CreateOrUpdateObject([FromBody] ObjectDto input)
        {
            try
            {
                var result = _objectService.CreateOrUpdateObject(input);
                return Ok(result);
            }
            catch (Exception e)
            {
                base._log.LogInformation("CreateOrUpdateStoreObject_Failed_" + e.Message);
                return Ok(e);
            }
        }
        [HttpPost("createorupdateitem")]
        public IActionResult CreateOrUpdateItem([FromBody] ItemsDto input)
        {
            try
            {
                var result = _itemService.CreateOrUpdateItem(input);
                return Ok(result);
            }
            catch (Exception e)
            {
                base._log.LogInformation("CreateOrUpdateStoreItem_Failed_" + e.Message);
                return Ok(e);
            }
        }
        [HttpPost("createorupdateorder")]
        public IActionResult CreateOrUpdateOrder([FromBody] OrderDto input)
        {
            try
            {
                var result = _sellerService.CreateOrUpdateOrderAsync(input);
                return Ok(result);
            }
            catch (Exception e)
            {
                base._log.LogInformation("CreateOrUpdateStoreOrder_Failed_" + e.Message);
                return Ok(e);
            }
        }
        [HttpPost("createordermany")]
        public IActionResult CreateOrderMany([FromBody] List<OrderDto> input)
        {
            try
            {
                var result = _buyerService.CreateOrderManyAsync(input);
                return Ok(result);
            }
            catch (Exception e)
            {
                base._log.LogInformation("CreateOrUpdateStoreOrderMany_Failed_" + e.Message);
                return Ok(e);
            }
        }
    }
}
